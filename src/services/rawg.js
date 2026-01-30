const BASE_URL = "https://api.rawg.io/api";
const KEY = import.meta.env.VITE_RAWG_KEY;

async function request(path, params = {}) {
    if (!KEY) throw new Error("Falta VITE_RAWG_KEY en .env (reinicia Vite)");

    const url = new URL(BASE_URL + path);
    url.searchParams.set("key", KEY);

    for (const [k, v] of Object.entries(params)) {
        if (v !== undefined && v !== null && v !== "") url.searchParams.set(k, v);
    }

    const res = await fetch(url);
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`RAWG error ${res.status}: ${text}`);
    }
    return res.json();
}

export function buscarJuegos({ texto = "", page_size = 12 } = {}) {
    return request("/games", { search: texto, page_size });
}
export function obtenerDetalleJuego(id) {
    return request(`/games/${id}`);
}
export function obtenerJuegosPopulares({ page_size = 12 } = {}) {
    return request("/games", { ordering: "-rating", page_size });
}
