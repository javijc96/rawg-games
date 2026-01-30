import { Link, NavLink } from "react-router-dom";

export default function Header() {
  const claseEnlace = ({ isActive }) =>
    `px-3 py-2 rounded-xl text-sm font-medium transition ${
      isActive ? "bg-slate-800" : "hover:bg-slate-900"
    }`;

  return (
    <header className="sticky top-0 z-10 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-lg font-extrabold tracking-tight">
          RAWG Explorer
        </Link>

        <nav className="flex items-center gap-2">
          <NavLink to="/" end className={claseEnlace}>
            Home
          </NavLink>
          <NavLink to="/juegos" className={claseEnlace}>
            Juegos
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
