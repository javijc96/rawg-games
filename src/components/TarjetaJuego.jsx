import {Link} from "react-router-dom"

export default function TarjetaJuego({ juego }) {
    return (
    <Link to={`/juegos/${juego.id}`} className="block">

        <article className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/30">
            <div className="aspect-[16/9] w-full bg-slate-800">
                {juego.background_image ? (
                    <img
                        src={juego.background_image}
                        alt={juego.name}
                        className="h-full w-full object-cover"
                        loading="lazy"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-sm text-slate-400">
                        Sin imagen
                    </div>
                )}
            </div>

            <div className="p-4">
                <h3 className="line-clamp-1 text-base font-semibold">{juego.name}</h3>

                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-300">
                    <span>⭐ {juego.rating ?? "N/A"}</span>
                    <span>📅 {juego.released ?? "N/A"}</span>
                </div>
            </div>
        </article>
    </Link>
    );
}
