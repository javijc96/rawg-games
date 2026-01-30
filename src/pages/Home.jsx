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
            <section className="rounded-3xl border border-slate-800 bg-slate-900/30 p-6 sm:p-10">
                <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                    Descubre videojuegos
                </h1>
                <p className="mt-3 max-w-2xl text-slate-300">
                    Busca títulos, entra al detalle y guarda tus favoritos.
                </p>

                <div className="mt-6">
                    <Link
                        to="/juegos"
                        className="inline-flex rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:opacity-90"
                    >
                        Ir al buscador
                    </Link>
                </div>
            </section>

            {cargando ? <p className="text-slate-300">Cargando populares...</p> : null}
            {error ? <p className="text-red-300">{error}</p> : null}

            <CarruselJuegos juegos={populares} />
        </div>
    );
}
