const CLAVE = "favoritos_juegos";

export function obtenerFavoritos() {
    try {
        return JSON.parse(localStorage.getItem(CLAVE) || "[]");
    } catch {
        return [];
    }
}

export function esFavorito(id) {
    const favs = obtenerFavoritos();
    return favs.includes(Number(id));
}

export function alternarFavorito(id) {
    const numId = Number(id);
    const favs = obtenerFavoritos();

    let siguiente;
    if (favs.includes(numId)) {
        siguiente = favs.filter((x) => x !== numId);
    } else {
        siguiente = [...favs, numId];
    }

    localStorage.setItem(CLAVE, JSON.stringify(siguiente));
    return siguiente;
}
