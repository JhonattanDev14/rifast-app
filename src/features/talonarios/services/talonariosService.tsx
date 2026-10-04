import {
    getTalonarios as getTalonariosRepository,
    getTalonarioById as getTalonarioByIdRepository,
    createTalonario as createTalonarioRepository,
    updateTalonario as updateTalonarioRepository,
} from '../repositories/talonariosRepository';

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
    return updateTalonarioRepository(id, data);
}