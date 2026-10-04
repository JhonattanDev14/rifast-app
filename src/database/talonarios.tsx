import { db } from '../database/database';

import type { TalonarioInput } from '@/schemas/talonarioSchema';

export function createTalonario(data: TalonarioInput) {
  db.runSync(
    `INSERT INTO talonarios
      (nombre, precio, cantidad_numeros, fecha)
     VALUES (?, ?, ?, ?)`,
    [data.nombre, data.precio, data.cantidad, data.fecha]
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
    fecha: string;
  }>('SELECT * FROM talonarios ORDER BY id DESC');
}