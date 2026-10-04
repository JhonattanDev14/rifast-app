
import type { VentaInput } from "@/schemas/ventaSchema";
import {
    getEstados,
    getVentas as getVentasRepository,
    getNumerosOcupados,
    insertVenta,
    insertNumero,
    updateVenta as updateVentaRepository,
    deleteNumerosByVentaId,
    getTalonarioCantidadNumeros,
    getTalonarioStats as getTalonarioStatsRepository,
} from "../repositories/ventaRepository";

function validarNumeroDeTalonario(
    talonarioId: number,
    numeros: number[]
) {
    const talonario = getTalonarioCantidadNumeros(talonarioId);

    if (!talonario) {
        throw new Error("El talonario no existe.");
    }

    const numeroInvalido = numeros.find(
        (numero) => numero < 1 || numero > talonario.cantidad_numeros
    );

    if (numeroInvalido !== undefined) {
        throw new Error(
            `El número ${numeroInvalido} no es válido. El talonario tiene ${talonario.cantidad_numeros} numeros`
        );
    }
}

export function createVenta(
    talonarioId: number,
    data: VentaInput
) {
    const numeros = data.numeros
        .split("#")
        .map((numero) => Number(numero.trim()));

    validarNumeroDeTalonario(talonarioId, numeros);

    const numerosOcupados = getNumerosOcupados(
        talonarioId,
        numeros
    );

    if (numerosOcupados.length > 0) {
        throw new Error(
            `El número ${numerosOcupados[0].numero} ya está ocupado.`
        );
    }

    const ventaId = insertVenta(
        talonarioId,
        data.comprador,
        data.telefono,
        data.estadoId,
        new Date().toISOString()
    );

    for (const numero of numeros) {
        insertNumero(talonarioId, numero, ventaId);
    }

    return ventaId;
}

export function updateVenta(
    talonarioId: number,
    ventaId: number,
    data: VentaInput
) {
    const numeros = data.numeros
        .split("#")
        .map((numero) => Number(numero.trim()));

    validarNumeroDeTalonario(talonarioId, numeros);

    const numerosOcupados = getNumerosOcupados(
        talonarioId,
        numeros,
        ventaId
    );

    if (numerosOcupados.length > 0) {
        throw new Error(
            `El número ${numerosOcupados[0].numero} ya está ocupado.`
        );
    }

    updateVentaRepository(
        ventaId,
        data.comprador,
        data.telefono,
        data.estadoId
    );

    deleteNumerosByVentaId(ventaId);

    for (const numero of numeros) {
        insertNumero(talonarioId, numero, ventaId);
    }
}

export function getEstadosVenta() {
    return getEstados();
}

export function getVentas(talonarioId: number) {
    return getVentasRepository(talonarioId);
}

export function getTalonarioStats(talonarioId: number) {
    return getTalonarioStatsRepository(talonarioId);
}

