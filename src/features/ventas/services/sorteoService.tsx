
import {
    getCandidatosSorteo,
    getGanadores,
    sortearNumero,
} from "./ventaService";

import { finalizarRifa } from "@/features/talonarios/services/talonariosService";
import { getTalonarioCantidadGanadores } from "../repositories/ventaRepository";


export function ejecutarSorteo(talonarioId: number) {
    const candidatos = getCandidatosSorteo(talonarioId);
    const ganadores = getGanadores(talonarioId);
    const configuracion = getTalonarioCantidadGanadores(talonarioId);

    if (!configuracion) {
        throw new Error("El talonario no existe.");
    }

    const ganadoresRestantes =
        configuracion.cantidad_ganadores - ganadores.length;

    if (ganadoresRestantes <= 0) {
        throw new Error("Ya se sortearon todos los ganadores.");
    }

    if (candidatos.length < ganadoresRestantes) {
        throw new Error(
            "No hay suficientes números disponibles para sortear."
        );
    }

    if (ganadores.length === 0) {
        finalizarRifa(talonarioId);
    }

    return sortearNumero(talonarioId);
}
