import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TarjetaJuego from "../components/TarjetaJuego";
import { obtenerFavoritos } from "../services/favoritos";
import { obtenerDetalleJuego } from "../services/rawg";

export default function Favoritos() {
    const [juegos, setJuegos] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        let vivo = true;

        async function cargarFavoritos() {
            const ids = obtenerFavoritos();

            if (!ids.length) {
                setJuegos([]);
                return;
            }

            setCargando(true);
            setError("");

            try {
                const detalles = await Promise.all(ids.map((id) => obtenerDetalleJuego(id)));
                if (!vivo) return;
                setJuegos(detalles);
            } catch (e) {
                if (!vivo) return;
                setError(e.message);
            } finally {
                if (vivo) setCargando(false);
            }
        }

        cargarFavoritos();
        return () => {
            vivo = false;
        };
    }, []);

    return (
        <div className="space-y-6">
            <header className="space-y-3">
                <h1 className="text-4xl font-extrabold bg-gradient-to-r from-primary-400 to-cyan-400 bg-clip-text text-transparent">Mis Favoritos</h1>
                <p className="text-base text-slate-300">
                    Aquí aparecen los juegos que has marcado como tus favoritos.
                </p>
            </header>

            <div className="flex flex-wrap gap-3">
                <Link
                    to="/juegos"
                    className="rounded-xl border-2 border-primary-600 px-6 py-3 text-base font-bold text-primary-400 hover:bg-primary-600/20 transition duration-300 hover:scale-105 transform"
                >
                    Ir a buscar juegos
                </Link>
            </div>

            {cargando ? <p className="text-center text-primary-400 font-semibold text-lg">Cargando favoritos...</p> : null}
            {error ? <p className="text-center text-red-400 font-semibold text-lg">{error}</p> : null}

            {!cargando && !error && juegos.length === 0 ? (
                <div className="rounded-2xl border-2 border-primary-600/30 bg-gradient-to-r from-slate-800/50 to-teal-900/30 p-8 text-center">
                    <p className="text-slate-300 text-lg mb-4">No tienes favoritos todavía</p>
                    <p className="text-slate-400">Entra en un juego y pulsa "Añadir a favoritos" para verlos aquí.</p>
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
