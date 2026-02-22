import { Link, NavLink } from "react-router-dom";

export default function Header() {
  const claseEnlace = ({ isActive }) =>
    `px-4 py-2 rounded-lg text-sm font-bold transition duration-300 ${isActive
      ? "bg-gradient-button text-white shadow-lg shadow-green-500/50"
      : "text-slate-100 hover:bg-primary-600/20 hover:text-primary-400"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-slate-900/95 via-teal-900/90 to-slate-900/95 backdrop-blur-md border-b border-primary-600/30 shadow-lg shadow-primary-500/20">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5">
        <Link to="/" className="text-2xl font-extrabold tracking-wider bg-gradient-to-r from-primary-400 to-cyan-400 bg-clip-text text-transparent hover:scale-105 transition transform">
          RAWG Explorer
        </Link>

        <nav className="flex items-center gap-3">
          <NavLink to="/" end className={claseEnlace}>
            Home
          </NavLink>
          <NavLink to="/juegos" className={claseEnlace}>
            Juegos
          </NavLink>
          <NavLink to="/publishers" className={claseEnlace}>
            Distribuidoras
          </NavLink>
          <NavLink to="/favoritos" className={claseEnlace}>
            Favoritos
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
