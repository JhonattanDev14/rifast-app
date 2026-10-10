import {
    getTalonarios as getTalonariosRepository,
    getTalonarioById as getTalonarioByIdRepository,
    createTalonario as createTalonarioRepository,
    updateTalonario as updateTalonarioRepository,
    finalizarTalonario
} from '../repositories/talonariosRepository';
import { getCandidatosSorteo } from "@/features/ventas/services/ventaService";

import type { TalonarioInput } from '@/schemas/talonarioSchema';

export function getTalonarios() {
    return getTalonariosRepository();
}

export function getTalonarioById(id: number) {
    return getTalonarioByIdRepository(id);
}

export function createTalonario(data: TalonarioInput) {
    return createTalonarioRepository(data);
}

export function updateTalonario(id: number, data: TalonarioInput) {
    const talonario = getTalonarioByIdRepository(id);

    if (!talonario) {
        throw new Error("La rifa no existe.");
    }

    if (new Date(talonario.fecha).getTime() < Date.now()) {
        throw new Error("No puedes editar una rifa finalizada.");
    }

    return updateTalonarioRepository(id, data);
}

export function finalizarRifa(id: number) {
    const candidatos = getCandidatosSorteo(id);

    if (candidatos.length === 0) {
        throw new Error(
            "No hay participantes disponibles para realizar el sorteo."
        );
    }

    finalizarTalonario(id);
}