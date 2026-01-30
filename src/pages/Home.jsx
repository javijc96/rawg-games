import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-800 bg-slate-900/30 p-6 sm:p-10">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Descubre videojuegos
        </h1>
        <p className="mt-3 max-w-2xl text-slate-300">
          Busca títulos, mira detalles y guarda tus favoritos. Empezamos por el
          listado con buscador.
        </p>


      </section>
    </div>
  );
}
