import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { obtenerDetalleJuego } from "../services/rawg";
import { esFavorito, alternarFavorito } from "../services/favoritos";


export default function DetalleJuego() {
    const { id } = useParams();

    const [juego, setJuego] = useState(null);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState("");
    const [favorito, setFavorito] = useState(false);


    useEffect(() => {
        let vivo = true;

        async function cargarDetalle() {
            setCargando(true);
            setError("");
            try {
                const data = await obtenerDetalleJuego(id);
                if (!vivo) return;
                setJuego(data);
                setFavorito(esFavorito(id));
            } catch (e) {
                if (!vivo) return;
                setError(e.message);
            } finally {
                if (vivo) setCargando(false);
            }
        }

        cargarDetalle();
        return () => {
            vivo = false;
        };
    }, [id]);

    function onToggleFavorito() {
        alternarFavorito(id);
        setFavorito(esFavorito(id));
    }


    if (cargando) return <p className="text-center text-primary-400 font-semibold text-lg">Cargando detalle...</p>;
    if (error) return <p className="text-center text-red-400 font-semibold text-lg">{error}</p>;
    if (!juego) return null;

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-gradient-to-r from-slate-800/50 via-teal-900/30 to-slate-800/50 backdrop-blur rounded-2xl p-6 border border-primary-600/30">
                <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-primary-400 to-cyan-400 bg-clip-text text-transparent">{juego.name}</h1>

                <div className="flex flex-wrap gap-3">
                    <button
                        onClick={onToggleFavorito}
                        className={
                            favorito
                                ? "rounded-xl bg-gradient-button px-6 py-2 text-base font-bold text-white hover:shadow-lg hover:shadow-primary-500/50 transition duration-300 shadow-lg transform hover:scale-105"
                                : "rounded-xl border-2 border-primary-600 px-6 py-2 text-base font-bold text-primary-400 hover:bg-primary-600/20 transition duration-300 hover:scale-105 transform"
                        }
                    >
                        {favorito ? "En favoritos" : "Añadir a favoritos"}
                    </button>

                    <Link
                        to="/juegos"
                        className="rounded-xl border-2 border-slate-600 px-6 py-2 text-base font-bold hover:bg-slate-700/50 transition duration-300 hover:scale-105 transform"
                    >
                        ← Volver
                    </Link>
                </div>
            </div>


            {juego.background_image ? (
                <img
                    src={juego.background_image}
                    alt={juego.name}
                    className="w-full rounded-3xl border-2 border-primary-600/40 object-cover shadow-2xl shadow-primary-500/30"
                    style={{ maxHeight: 420 }}
                />
            ) : null}

            <div className="flex flex-wrap gap-3 text-sm">
                <span className="rounded-full border border-primary-600/50 bg-gradient-to-r from-primary-600/20 to-teal-600/20 px-4 py-2 font-semibold text-primary-300">
                    Rating: {juego.rating ?? "N/A"}
                </span>
                <span className="rounded-full border border-blue-600/50 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 px-4 py-2 font-semibold text-blue-300">
                    Lanzamiento: {juego.released ?? "N/A"}
                </span>
                <span className="rounded-full border border-purple-600/50 bg-gradient-to-r from-purple-600/20 to-pink-600/20 px-4 py-2 font-semibold text-purple-300">
                    Metacritic: {juego.metacritic ?? "N/A"}
                </span>
            </div>

            <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-2xl border border-primary-600/40 bg-gradient-to-br from-slate-800/50 to-teal-900/30 backdrop-blur p-6 shadow-lg shadow-primary-500/10">
                    <h2 className="text-xl font-bold text-primary-400">Géneros</h2>
                    <div className="mt-3 flex flex-wrap gap-2">
                        {(juego.genres || []).length > 0 ? (
                            juego.genres.map((g) => (
                                <Link
                                    key={g.id}
                                    to={`/juegos?genres=${g.id}`}
                                    className="text-slate-200 hover:text-primary-400 transition"
                                >
                                    {g.name}
                                </Link>
                            )).reduce((prev, curr) => [prev, ", ", curr])
                        ) : "N/A"}
                    </div>
                </div>

                <div className="rounded-2xl border border-primary-600/40 bg-gradient-to-br from-slate-800/50 to-teal-900/30 backdrop-blur p-6 shadow-lg shadow-primary-500/10">
                    <h2 className="text-xl font-bold text-primary-400">Distribuidoras (Publishers)</h2>
                    <div className="mt-3 flex flex-wrap gap-2">
                        {(juego.publishers || []).length > 0 ? (
                            juego.publishers.map((p) => (
                                <Link
                                    key={p.id}
                                    to={`/publishers/${p.id}`}
                                    className="text-slate-200 hover:text-primary-400 transition"
                                >
                                    {p.name}
                                </Link>
                            )).reduce((prev, curr) => [prev, ", ", curr])
                        ) : "N/A"}
                    </div>
                </div>

                <div className="rounded-2xl border border-primary-600/40 bg-gradient-to-br from-slate-800/50 to-teal-900/30 backdrop-blur p-6 shadow-lg shadow-primary-500/10">
                    <h2 className="text-xl font-bold text-primary-400">Plataformas</h2>
                    <div className="mt-3 flex flex-wrap gap-2">
                        {(juego.platforms || []).length > 0 ? (
                            juego.platforms.map((p) => (
                                <span key={p.platform.id} className="text-slate-200">
                                    {p.platform.name}
                                </span>
                            )).reduce((prev, curr) => [prev, ", ", curr])
                        ) : "N/A"}
                    </div>
                </div>
            </section>

            <section className="rounded-2xl border border-primary-600/40 bg-gradient-to-br from-slate-800/50 to-teal-900/30 backdrop-blur p-6 shadow-lg shadow-primary-500/10">
                <h2 className="text-xl font-bold text-primary-400">Etiquetas (Tags)</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                    {(juego.tags || []).length > 0 ? (
                        juego.tags.map((t) => (
                            <Link
                                key={t.id}
                                to={`/juegos?tags=${t.id}`}
                                className="rounded-full border border-primary-600/30 bg-primary-600/10 px-3 py-1 text-xs font-medium text-primary-300 hover:bg-primary-600/20 transition"
                            >
                                {t.name}
                            </Link>
                        ))
                    ) : (
                        <p className="text-slate-400 italic">No hay etiquetas disponibles</p>
                    )}
                </div>
            </section>

            <section className="rounded-2xl border border-primary-600/40 bg-gradient-to-br from-slate-800/50 to-teal-900/30 backdrop-blur p-6 shadow-lg shadow-primary-500/10">
                <h2 className="text-xl font-bold text-primary-400">Descripción</h2>
                <div
                    className="prose prose-invert mt-4 max-w-none text-slate-200 leading-relaxed"
                    dangerouslySetInnerHTML={{
                        __html: juego.description || "<p>No disponible</p>",
                    }}
                />
            </section>
        </div>
    );
}
