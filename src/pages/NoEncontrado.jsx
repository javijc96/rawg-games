import { Link } from "react-router-dom";

export default function NoEncontrado() {
    return (
        <div className="space-y-6">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/30 p-6 sm:p-10">
                <h1 className="text-3xl font-extrabold">404</h1>
                <p className="mt-3 text-slate-300">
                    La página que buscas no existe.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                    <Link
                        to="/"
                        className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:opacity-90"
                    >
                        Volver a Home
                    </Link>

                    <Link
                        to="/juegos"
                        className="rounded-2xl border border-slate-700 px-5 py-3 text-sm font-semibold hover:bg-slate-900/40"
                    >
                        Ir a Juegos
                    </Link>
                </div>
            </div>
        </div>
    );
}
