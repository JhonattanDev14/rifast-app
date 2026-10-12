import { db } from '@/database/database';
import type { TalonarioInput } from '@/schemas/talonarioSchema';

export function createTalonario(data: TalonarioInput) {
    db.runSync(
        `INSERT INTO talonarios
        (nombre, precio, cantidad_numeros, cantidad_ganadores, fecha)
        VALUES (?, ?, ?, ?, ?)`,
        [data.nombre, data.precio, data.cantidad, data.ganadores, data.fecha]
    );
}

export function updateTalonario(id: number, data: TalonarioInput) {
    db.runSync(
        `UPDATE talonarios
        SET nombre = ?, precio = ?, cantidad_numeros = ?, fecha = ?
        WHERE id = ?`,
        [data.nombre, data.precio, data.cantidad, data.fecha, id]
    );
}

export function getTalonarios() {
    return db.getAllSync<{
        id: number;
        nombre: string;
        precio: number;
        cantidad_numeros: number;
        cantidad_ganadores: number;
        fecha: string;
    }>(
        'SELECT * FROM talonarios ORDER BY id DESC'
    );
}

export function getTalonarioById(id: number) {
    return db.getFirstSync<{
        id: number;
        nombre: string;
        precio: number;
        cantidad_ganadores: number;
        cantidad_numeros: number;
        fecha: string;
    }>(
        'SELECT * FROM talonarios WHERE id = ?',
        [id]
    );
}

export function finalizarTalonario(id: number) {
    const fechaFinalizada = new Date(Date.now() - 60 * 1000).toISOString();

    db.runSync(
        `UPDATE talonarios
        SET fecha = ?
        WHERE id = ?`,
        [fechaFinalizada, id]
    );
}