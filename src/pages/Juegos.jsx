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
            <header className="space-y-3">
                <h1 className="text-4xl font-extrabold bg-gradient-to-r from-primary-400 to-cyan-400 bg-clip-text text-transparent">🕹️ Buscador de Juegos</h1>
                <p className="text-base text-slate-300">Busca tus juegos favoritos por nombre y descubre nuevos títulos.</p>
            </header>

            <form onSubmit={onSubmit} className="flex gap-3 flex-col sm:flex-row">
                <input
                    value={texto}
                    onChange={(e) => setTexto(e.target.value)}
                    placeholder="Zelda, Pokemon, Elden Ring..."
                    className="flex-1 rounded-xl border-2 border-primary-600/40 bg-slate-800/50 px-5 py-3 text-base outline-none placeholder:text-slate-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition"
                />
                <button
                    type="submit"
                    className="rounded-xl bg-gradient-button px-8 py-3 text-base font-bold text-white hover:shadow-lg hover:shadow-primary-500/50 transition duration-300 hover:scale-105 transform shadow-lg whitespace-nowrap"
                >
                    Buscar
                </button>
            </form>

            {cargando ? <p className="text-center text-primary-400 font-semibold text-lg">Buscando juegos...</p> : null}
            {error ? <p className="text-center text-red-400 font-semibold text-lg">{error}</p> : null}
            
            {!cargando && !error && juegos.length === 0 && texto ? (
                <div className="rounded-2xl border-2 border-primary-600/30 bg-gradient-to-r from-slate-800/50 to-teal-900/30 p-8 text-center">
                    <p className="text-slate-300 text-lg">No se encontraron juegos para "{texto}"</p>
                </div>
            ) : null}

            <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {juegos.map((j) => (
                    <TarjetaJuego key={j.id} juego={j} />
                ))}
            </section>

        </div>
    );
}
