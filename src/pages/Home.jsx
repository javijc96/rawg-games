import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { obtenerJuegosPopulares } from "../services/rawg";
import CarruselJuegos from "../components/CarruselJuegos";

export default function Home() {
    const [populares, setPopulares] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        let vivo = true;

        async function cargarPopulares() {
            setCargando(true);
            setError("");
            try {
                const data = await obtenerJuegosPopulares({ page_size: 12 });
                if (!vivo) return;
                setPopulares(data.results ?? []);
            } catch (e) {
                if (!vivo) return;
                setError(e.message);
            } finally {
                if (vivo) setCargando(false);
            }
        }

        cargarPopulares();
        return () => {
            vivo = false;
        };
    }, []);

    return (
        <div className="space-y-8">
            <section className="rounded-3xl border border-primary-600/40 bg-gradient-to-br from-slate-800/50 via-teal-900/40 to-slate-800/50 backdrop-blur-md p-6 sm:p-12 shadow-2xl shadow-primary-500/20">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="max-w-2xl">
                        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-primary-400 via-cyan-400 to-teal-300 bg-clip-text text-transparent">
                            Descubre
                        </h2>

                        <p className="mt-4 text-slate-200 text-lg leading-relaxed">
                            Usa el buscador para encontrar el juego que tengas en mente y veras toda la informacion que necesitas.
                        </p>
                    </div>


                    <Link
                        to="/juegos"
                        className="inline-flex justify-center rounded-xl bg-gradient-button hover:shadow-lg hover:shadow-primary-500/50 px-7 py-4 text-base font-bold text-white transition duration-300 hover:scale-105 transform shadow-lg sm:ml-6 sm:shrink-0"
                    >
                        Buscador
                    </Link>
                </div>
            </section>

            {cargando ? <p className="text-center text-primary-400 font-semibold text-lg">⏳ Cargando juegos populares...</p> : null}
            {error ? <p className="text-center text-red-400 font-semibold text-lg">❌ {error}</p> : null}

            {populares.length > 0 && (
                <>
                    <h2 className="text-3xl font-bold text-slate-100 mt-12">
                        Juegos Populares
                    </h2>
                    <CarruselJuegos juegos={populares} />
                </>
            )}
        </div>
    );
}
