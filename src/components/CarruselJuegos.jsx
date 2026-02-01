import { useEffect, useMemo, useRef, useCallback } from "react";
import TarjetaJuego from "./TarjetaJuego";

export default function CarruselJuegos({ juegos = [] }) {
    const carrilRef = useRef(null);
    const autoplayRef = useRef(null);

    const hayJuegos = juegos && juegos.length > 0;

    const obtenerPaso = useCallback(() => {
        const carril = carrilRef.current;
        if (!carril) return 0;

        const items = carril.querySelectorAll("[data-item='tarjeta']");
        if (!items.length) return 0;

        const primero = items[0].getBoundingClientRect();

        if (items.length >= 2) {
            const segundo = items[1].getBoundingClientRect();
            return Math.round(segundo.left - primero.left);
        }

        return Math.round(primero.width);
    }, []);

    const irSiguiente = useCallback(() => {
        const carril = carrilRef.current;
        if (!carril) return;

        const paso = obtenerPaso();
        if (!paso) return;

        const maxScroll = carril.scrollWidth - carril.clientWidth;
        const siguientePos = carril.scrollLeft + paso;

        if (siguientePos >= maxScroll - 2) {
            carril.scrollTo({ left: 0, behavior: "smooth" });
            return;
        }

        carril.scrollTo({ left: siguientePos, behavior: "smooth" });
    }, [obtenerPaso]);

    const irAnterior = useCallback(() => {
        const carril = carrilRef.current;
        if (!carril) return;

        const paso = obtenerPaso();
        if (!paso) return;

        const anteriorPos = carril.scrollLeft - paso;

        if (anteriorPos <= 0) {
            const maxScroll = carril.scrollWidth - carril.clientWidth;
            carril.scrollTo({ left: maxScroll, behavior: "smooth" });
            return;
        }

        carril.scrollTo({ left: anteriorPos, behavior: "smooth" });
    }, [obtenerPaso]);

    useEffect(() => {
        if (!hayJuegos) return;

        autoplayRef.current = setInterval(() => {
            irSiguiente();
        }, 5000);

        return () => clearInterval(autoplayRef.current);
    }, [hayJuegos, irSiguiente]);

    const pausar = () => clearInterval(autoplayRef.current);
    const reanudar = () => {
        clearInterval(autoplayRef.current);
        autoplayRef.current = setInterval(() => irSiguiente(), 5000);
    };

    const botonClase =
        "w-10 sm:w-12 rounded-xl border-2 border-primary-600/50 bg-gradient-to-br from-slate-800 to-teal-900 hover:border-primary-400 hover:from-primary-600 hover:to-teal-700 transition duration-300 flex items-center justify-center text-2xl font-bold text-primary-300 hover:text-white shadow-lg hover:shadow-primary-500/50 hover:scale-110 transform";

    if (!hayJuegos) return null;

    return (
        <section className="space-y-6">
            <div className="flex items-stretch gap-4">
                <button
                    onClick={irAnterior}
                    aria-label="Anterior"
                    className={botonClase}
                    title="Anterior"
                >
                    ‹
                </button>

                <div
                    className="flex-1 overflow-hidden"
                    onMouseEnter={pausar}
                    onMouseLeave={reanudar}
                >
                    <div
                        ref={carrilRef}
                        className="flex gap-4 overflow-x-scroll overflow-y-hidden scroll-smooth scrollbar-oculta"
                    >

                        {juegos.map((j) => (
                            <div
                                key={j.id}
                                data-item="tarjeta"
                                className="
                flex-none
                w-[80%]
                sm:w-[48%]
                lg:w-[32%]
                "
                            >
                                <TarjetaJuego juego={j} />
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    onClick={irSiguiente}
                    aria-label="Siguiente"
                    className={botonClase}
                    title="Siguiente"
                >
                    ›
                </button>
            </div>
        </section>
    );
}
