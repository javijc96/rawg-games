import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

export default function App() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </main>
  );
}
