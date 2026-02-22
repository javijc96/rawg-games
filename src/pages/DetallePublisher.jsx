import { useEffect, useState } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import { obtenerDetallePublisher, obtenerJuegosPorFiltro } from "../services/rawg";
import TarjetaJuego from "../components/TarjetaJuego";
import Paginacion from "../components/Paginacion";

export default function DetallePublisher() {
    const { id } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const page = parseInt(searchParams.get("page") || "1", 10);

    const [publisher, setPublisher] = useState(null);
    const [juegos, setJuegos] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        let vivo = true;

        async function cargarDatos() {
            setCargando(true);
            setError("");
            try {
                const [pubData, gamesData] = await Promise.all([
                    obtenerDetallePublisher(id),
                    obtenerJuegosPorFiltro({ publishers: id, page, page_size: 12 })
                ]);

                if (!vivo) return;
                setPublisher(pubData);
                setJuegos(gamesData.results ?? []);
            } catch (e) {
                if (!vivo) return;
                setError(e.message);
            } finally {
                if (vivo) setCargando(false);
            }
        }

        cargarDatos();
        return () => {
            vivo = false;
        };
    }, [id, page]);

    function onPageChange(newPage) {
        setSearchParams({ page: newPage.toString() });
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    if (error) return <p className="text-center text-red-400 font-semibold text-lg">{error}</p>;
    if (cargando && !publisher) return <p className="text-center text-primary-400 font-semibold text-lg">Cargando distribuidora...</p>;
    if (!publisher) return null;

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-gradient-to-r from-slate-800/50 via-teal-900/30 to-slate-800/50 backdrop-blur rounded-2xl p-6 border border-primary-600/30">
                <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-primary-400 to-cyan-400 bg-clip-text text-transparent">{publisher.name}</h1>
                <Link
                    to="/publishers"
                    className="rounded-xl border-2 border-slate-600 px-6 py-2 text-base font-bold hover:bg-slate-700/50 transition duration-300 hover:scale-105 transform"
                >
                    ← Volver
                </Link>
            </div>

            <section className="rounded-2xl border border-primary-600/40 bg-gradient-to-br from-slate-800/50 to-teal-900/30 backdrop-blur p-6 shadow-lg shadow-primary-500/10">
                <h2 className="text-xl font-bold text-primary-400">Descripción</h2>
                <div
                    className="prose prose-invert mt-4 max-w-none text-slate-200 leading-relaxed"
                    dangerouslySetInnerHTML={{
                        __html: publisher.description || "<p>No disponible</p>",
                    }}
                />
            </section>

            <section className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-100">Videojuegos de {publisher.name}</h2>
                {cargando ? (
                    <p className="text-center text-primary-400">Cargando juegos...</p>
                ) : (
                    <>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {juegos.map((j) => (
                                <TarjetaJuego key={j.id} juego={j} />
                            ))}
                        </div>
                        {juegos.length > 0 && (
                            <Paginacion current={page} onPageChange={onPageChange} />
                        )}
                    </>
                )}
            </section>
        </div>
    );
}
