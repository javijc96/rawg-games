import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Juegos from "./pages/Juegos";
import DetallesJuego from "./pages/DetallesJuego";
import Favoritos from "./pages/Favoritos";
import NoEncontrado from "./pages/NoEncontrado";

import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 w-full">
        <div className="mx-auto w-full max-w-6xl px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/juegos" element={<Juegos />} />
            <Route path="/juegos/:id" element={<DetallesJuego />} />
            <Route path="/favoritos" element={<Favoritos />} />
            <Route path="*" element={<NoEncontrado />} />
          </Routes>
        </div>
      </main>

      <Footer />
    </div>
  );
}
