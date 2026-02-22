import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { obtenerPublishers } from "../services/rawg";
import Paginacion from "../components/Paginacion";

export default function Publishers() {
    const [searchParams, setSearchParams] = useSearchParams();

    const textoQuery = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);

    const [textoInput, setTextoInput] = useState(textoQuery);
    const [publishers, setPublishers] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        let vivo = true;

        async function cargarDatos() {
            setCargando(true);
            setError("");
            try {
                const data = await obtenerPublishers({ texto: textoQuery, page, page_size: 12 });
                if (!vivo) return;
                setPublishers(data.results ?? []);
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
    }, [textoQuery, page]);

    function onSearch(e) {
        e.preventDefault();
        setSearchParams({ search: textoInput, page: "1" });
    }

    function onPageChange(newPage) {
        setSearchParams({ search: textoQuery, page: newPage.toString() });
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    return (
        <div className="space-y-6">
            <header className="space-y-3">
                <h1 className="text-4xl font-extrabold bg-gradient-to-r from-primary-400 to-cyan-400 bg-clip-text text-transparent">Buscador de Distribuidoras</h1>
                <p className="text-base text-slate-300">Encuentra a los creadores de tus títulos favoritos.</p>
            </header>

            <form onSubmit={onSearch} className="flex gap-3 flex-col sm:flex-row">
                <input
                    value={textoInput}
                    onChange={(e) => setTextoInput(e.target.value)}
                    placeholder="Nintendo, Ubisoft, Sony..."
                    className="flex-1 rounded-xl border-2 border-primary-600/40 bg-slate-800/50 px-5 py-3 text-base outline-none placeholder:text-slate-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition"
                />
                <button
                    type="submit"
                    className="rounded-xl bg-gradient-button px-8 py-3 text-base font-bold text-white hover:shadow-lg hover:shadow-primary-500/50 transition duration-300 hover:scale-105 transform shadow-lg whitespace-nowrap"
                >
                    Buscar
                </button>
            </form>

            {cargando ? <p className="text-center text-primary-400 font-semibold text-lg">Cargando distribuidoras...</p> : null}
            {error ? <p className="text-center text-red-400 font-semibold text-lg">{error}</p> : null}

            {!cargando && !error && publishers.length === 0 ? (
                <div className="rounded-2xl border-2 border-primary-600/30 bg-gradient-to-r from-slate-800/50 to-teal-900/30 p-8 text-center">
                    <p className="text-slate-300 text-lg">No se encontraron distribuidoras.</p>
                </div>
            ) : null}

            <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {publishers.map((p) => (
                    <Link
                        key={p.id}
                        to={`/publishers/${p.id}`}
                        className="group flex flex-col items-center gap-4 rounded-3xl border border-primary-600/30 bg-gradient-to-br from-slate-800/50 to-teal-900/30 p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:border-primary-500 hover:shadow-primary-500/20"
                    >
                        {p.image_background && (
                            <img
                                src={p.image_background}
                                alt={p.name}
                                className="h-32 w-full rounded-2xl object-cover opacity-80 group-hover:opacity-100 transition"
                            />
                        )}
                        <h2 className="text-xl font-bold text-slate-100 group-hover:text-primary-400 transition">{p.name}</h2>
                        <span className="text-sm text-slate-400">{p.games_count} juegos</span>
                    </Link>
                ))}
            </section>

            {!cargando && publishers.length > 0 && (
                <Paginacion current={page} onPageChange={onPageChange} />
            )}
        </div>
    );
}
