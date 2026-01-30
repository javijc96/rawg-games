import { useMemo, useState } from "react";
import TarjetaJuego from "./TarjetaJuego";

export default function CarruselJuegos({ juegos = [] }) {
    const [indice, setIndice] = useState(0);

    const visibles = useMemo(() => {
        if (!juegos.length) return [];
        const cantidad = Math.min(3, juegos.length);
        const arr = [];
        for (let i = 0; i < cantidad; i++) {
            arr.push(juegos[(indice + i) % juegos.length]);
        }
        return arr;
    }, [juegos, indice]);

    if (!juegos.length) return null;

    return (
        <section className="space-y-4">
            <div className="flex items-center justify-between gap-3">
                <h2 className="text-xl font-extrabold">Populares</h2>

                <div className="flex gap-2">
                    <button
                        onClick={() => setIndice((i) => (i - 1 + juegos.length) % juegos.length)}
                        className="rounded-2xl border border-slate-700 px-4 py-2 text-sm font-semibold hover:bg-slate-900/40"
                    >
                        Anterior
                    </button>
                    <button
                        onClick={() => setIndice((i) => (i + 1) % juegos.length)}
                        className="rounded-2xl border border-slate-700 px-4 py-2 text-sm font-semibold hover:bg-slate-900/40"
                    >
                        Siguiente
                    </button>
                </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {visibles.map((j) => (
                    <TarjetaJuego key={j.id} juego={j} />
                ))}
            </div>
        </section>
    );
}
