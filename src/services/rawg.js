const BASE_URL = import.meta.env.DEV
    ? "/api"
    : "https://api.rawg.io/api";

const KEY = import.meta.env.VITE_RAWG_KEY;

function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
}

function mensajeBonitoPorStatus(status) {
    if (status === 401) return "Clave API no válida (401). Revisa VITE_RAWG_KEY.";
    if (status === 403) return "Acceso denegado (403). Revisa tu API key/permisos.";
    if (status === 429) return "Demasiadas peticiones (429). Espera un poco y reintenta.";
    if (status === 502) return "RAWG está temporalmente caído (502). Prueba en unos minutos.";
    if (status === 503) return "RAWG no está disponible ahora (503). Prueba en unos minutos.";
    if (status === 504) return "RAWG tarda demasiado en responder (504). Prueba en unos minutos.";
    return `RAWG error ${status}`;
}

async function request(path, params = {}) {
    if (!KEY) throw new Error("Falta VITE_RAWG_KEY en .env (reinicia Vite)");

    const url = new URL(BASE_URL + path, window.location.origin);
    url.searchParams.set("key", KEY);

    for (const [k, v] of Object.entries(params)) {
        if (v !== undefined && v !== null && v !== "") url.searchParams.set(k, v);
    }

    const MAX_INTENTOS = 2;

    for (let intento = 1; intento <= MAX_INTENTOS; intento++) {
        try {
            const res = await fetch(url.toString(), {
                method: "GET",
                headers: { Accept: "application/json" },
            });

            if (!res.ok) {
                const contentType = res.headers.get("content-type") || "";
                let mensaje = mensajeBonitoPorStatus(res.status);

                if (contentType.includes("application/json")) {
                    try {
                        const data = await res.json();
                        if (data?.error) mensaje = `${mensaje}: ${data.error}`;
                    } catch {
                    }
                }

                const esTemporal = [502, 503, 504].includes(res.status);
                if (esTemporal && intento < MAX_INTENTOS) {
                    await sleep(800);
                    continue;
                }

                throw new Error(mensaje);
            }

            return await res.json();
        } catch (error) {
            const esUltimo = intento >= MAX_INTENTOS;
            if (!esUltimo) {
                await sleep(800);
                continue;
            }

            console.error("Error en request a RAWG:", error);
            throw new Error(`Error al conectar con la API: ${error.message}`);
        }
    }
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
