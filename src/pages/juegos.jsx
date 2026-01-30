import { useEffect, useState } from "react";
import { buscarJuegos } from "../services/rawg";
import TarjetaJuego from "../components/TarjetaJuego";


export default function Juegos() {
    const [texto, setTexto] = useState("");
    const [juegos, setJuegos] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        let vivo = true;

        async function cargarInicial() {
            setCargando(true);
            setError("");
            try {
                const data = await buscarJuegos({ texto: "", page_size: 12 });
                if (!vivo) return;
                setJuegos(data.results ?? []);
            } catch (e) {
                if (!vivo) return;
                setError(e.message);
            } finally {
                if (vivo) setCargando(false);
            }
        }

        cargarInicial();
        return () => {
            vivo = false;
        };
    }, []);

    async function onSubmit(e) {
        e.preventDefault();
        setCargando(true);
        setError("");

        try {
            const data = await buscarJuegos({ texto, page_size: 12 });
            setJuegos(data.results ?? []);
        } catch (e) {
            setError(e.message);
        } finally {
            setCargando(false);
        }
    }

    return (
        <div className="space-y-6">
            <header className="space-y-2">
                <h1 className="text-2xl font-extrabold">Juegos</h1>
                <p className="text-sm text-slate-400">Busca un juego por nombre.</p>
            </header>

            <form onSubmit={onSubmit} className="flex gap-2">
                <input
                    value={texto}
                    onChange={(e) => setTexto(e.target.value)}
                    placeholder="Ej: Zelda, Mario..."
                    className="w-full rounded-2xl border border-slate-800 bg-slate-900/40 px-4 py-3 text-sm outline-none placeholder:text-slate-500 focus:border-slate-600"
                />
                <button
                    type="submit"
                    className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:opacity-90"
                >
                    Buscar
                </button>
            </form>

            {cargando ? <p className="text-slate-300">Cargando...</p> : null}
            {error ? <p className="text-red-300">{error}</p> : null}
            <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {juegos.map((j) => (
                    <TarjetaJuego key={j.id} juego={j} />
                ))}
            </section>

        </div>
    );
}
