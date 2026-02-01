import { Link } from "react-router-dom";

export default function TarjetaJuego({ juego }) {
    return (
        <Link to={`/juegos/${juego.id}`} className="block group h-full">
            <article className="h-full overflow-hidden rounded-2xl border border-primary-600/40 bg-gradient-to-b from-slate-800/60 to-teal-900/40 backdrop-blur-sm hover:border-primary-500 transition duration-300 hover:shadow-lg hover:shadow-primary-500/30 group-hover:scale-105 transform">
                <div className="aspect-[16/9] w-full bg-gradient-to-b from-slate-700/80 to-teal-800/60 relative overflow-hidden">
                    {juego.background_image ? (
                        <img
                            src={juego.background_image}
                            alt={juego.name}
                            className="h-full w-full object-cover group-hover:scale-110 transition duration-300"
                            loading="lazy"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center text-sm text-slate-300">
                            Sin imagen
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
                </div>

                <div className="flex h-[120px] flex-col p-4 bg-gradient-to-b from-slate-800/40 to-teal-900/20">
                    <h3 className="line-clamp-2 text-base font-bold text-slate-100 group-hover:text-primary-400 transition">
                        {juego.name}
                    </h3>

                    <div className="mt-auto flex flex-wrap gap-x-3 gap-y-2 text-sm text-slate-300">
                        <span className="bg-primary-600/20 px-2 py-1 rounded-full">
                            {juego.rating ?? "N/A"}
                        </span>
                        <span className="bg-blue-600/20 px-2 py-1 rounded-full">
                            {juego.released ?? "N/A"}
                        </span>
                    </div>
                </div>
            </article>
        </Link>
    );
}
