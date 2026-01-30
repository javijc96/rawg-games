import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { obtenerDetalleJuego } from "../services/rawg";

export default function DetalleJuego() {
    const { id } = useParams();

    const [juego, setJuego] = useState(null);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        let vivo = true;

        async function cargarDetalle() {
            setCargando(true);
            setError("");
            try {
                const data = await obtenerDetalleJuego(id);
                if (!vivo) return;
                setJuego(data);
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

    if (cargando) return <p className="text-slate-300">Cargando detalle...</p>;
    if (error) return <p className="text-red-300">{error}</p>;
    if (!juego) return null;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between gap-4">
                <h1 className="text-2xl font-extrabold">{juego.name}</h1>
                <Link
                    to="/juegos"
                    className="rounded-2xl border border-slate-700 px-4 py-2 text-sm font-semibold hover:bg-slate-900/40"
                >
                    Volver
                </Link>
            </div>

            {juego.background_image ? (
                <img
                    src={juego.background_image}
                    alt={juego.name}
                    className="w-full rounded-3xl border border-slate-800 object-cover"
                    style={{ maxHeight: 420 }}
                />
            ) : null}

            <div className="flex flex-wrap gap-3 text-sm text-slate-300">
                <span className="rounded-full border border-slate-800 bg-slate-900/30 px-3 py-1">
                    ⭐ Rating: {juego.rating ?? "N/A"}
                </span>
                <span className="rounded-full border border-slate-800 bg-slate-900/30 px-3 py-1">
                    📅 Lanzamiento: {juego.released ?? "N/A"}
                </span>
                <span className="rounded-full border border-slate-800 bg-slate-900/30 px-3 py-1">
                    🏆 Metacritic: {juego.metacritic ?? "N/A"}
                </span>
            </div>

            <section className="grid gap-4 md:grid-cols-2">
                <div className="rounded-3xl border border-slate-800 bg-slate-900/30 p-5">
                    <h2 className="text-lg font-bold">Géneros</h2>
                    <p className="mt-2 text-slate-300">
                        {(juego.genres || []).map((g) => g.name).join(", ") || "N/A"}
                    </p>
                </div>

                <div className="rounded-3xl border border-slate-800 bg-slate-900/30 p-5">
                    <h2 className="text-lg font-bold">Plataformas</h2>
                    <p className="mt-2 text-slate-300">
                        {(juego.platforms || [])
                            .map((p) => p.platform?.name)
                            .filter(Boolean)
                            .join(", ") || "N/A"}
                    </p>
                </div>
            </section>

            <section className="rounded-3xl border border-slate-800 bg-slate-900/30 p-5">
                <h2 className="text-lg font-bold">Descripción</h2>
                <div
                    className="prose prose-invert mt-3 max-w-none"
                    dangerouslySetInnerHTML={{
                        __html: juego.description || "<p>No disponible</p>",
                    }}
                />
            </section>
        </div>
    );
}
