import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Juegos from "./pages/juegos";
import DetalleJuego from "./pages/DetallesJuego";

export default function App() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/juegos" element={<Juegos />} />
        <Route path="/Juegos/:id" element={<DetalleJuego />} />

      </Routes>
    </main>
  );
}
