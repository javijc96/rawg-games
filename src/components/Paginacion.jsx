import React from "react";

export default function Paginacion({ current, total, onPageChange }) {
    // Note: RAWG API doesn't always provide total pages clearly in every endpoint, 
    // but it provides "next" and "previous" URLs.
    // However, for simplicity and following the requirement: "juego?page=4"

    if (total <= 1 && current === 1) return null;

    return (
        <div className="flex items-center justify-center gap-4 py-8">
            <button
                disabled={current <= 1}
                onClick={() => onPageChange(current - 1)}
                className="rounded-xl border-2 border-primary-600 px-6 py-2 text-base font-bold text-primary-400 hover:bg-primary-600/20 transition duration-300 disabled:opacity-30 disabled:cursor-not-allowed transform hover:scale-105"
            >
                ← Anterior
            </button>

            <span className="text-lg font-bold text-slate-200 bg-slate-800/50 px-5 py-2 rounded-xl border border-primary-600/30">
                Página {current}
            </span>

            <button
                onClick={() => onPageChange(current + 1)}
                className="rounded-xl border-2 border-primary-600 px-6 py-2 text-base font-bold text-primary-400 hover:bg-primary-600/20 transition duration-300 transform hover:scale-105"
            >
                Siguiente →
            </button>
        </div>
    );
}
