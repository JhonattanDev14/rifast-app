import { db } from "@/database/database";

export function getVentas(talonarioId: number) {
    return db.getAllSync<{
        id: number;
        talonario_id: number;
        comprador: string;
        telefono: number;
        estado_id: number;
        fecha: string;
        numeros: string;
    }>(
        `
        SELECT 
            ventas.*,
            estados.nombre AS estado,
            GROUP_CONCAT(numeros.numero, '#') AS numeros
        FROM ventas
        LEFT JOIN estados ON estados.id = ventas.estado_id
        LEFT JOIN numeros ON numeros.venta_id = ventas.id
        WHERE ventas.talonario_id = ?
        GROUP BY ventas.id
        ORDER BY ventas.id DESC
        `,
        [talonarioId]
    );
}
export function getEstados() {
    return db.getAllSync<{
        id: number;
        nombre: string;
    }>(
        `SELECT id, nombre
         FROM estados
         ORDER BY id`
    );
}
export function getNumerosOcupados(
    talonarioId: number,
    numeros: number[],
    ventaId?: number
) {
    const placeholders = numeros.map(() => "?").join(", ");

    return db.getAllSync<{ numero: number }>(
        `SELECT numero
         FROM numeros
         WHERE talonario_id = ?
         AND numero IN (${placeholders})
         ${ventaId ? "AND venta_id != ?" : ""}`,
        [talonarioId, ...numeros, ...(ventaId ? [ventaId] : [])]
    );
}

export function insertVenta(
    talonarioId: number,
    comprador: string,
    telefono: number,
    estadoId: number,
    fecha: string
) {
    const result = db.runSync(
        `INSERT INTO ventas
         (talonario_id, comprador, telefono, estado_id, fecha)
         VALUES (?, ?, ?, ?, ?)`,
        [talonarioId, comprador, telefono, estadoId, fecha]
    );

    return result.lastInsertRowId;
}

export function insertNumero(
    talonarioId: number,
    numero: number,
    ventaId: number
) {
    db.runSync(
        `INSERT INTO numeros
         (talonario_id, numero, venta_id)
         VALUES (?, ?, ?)`,
        [talonarioId, numero, ventaId]
    );
}

export function updateVenta(
    ventaId: number,
    comprador: string,
    telefono: number,
    estadoId: number
) {
    db.runSync(
        `UPDATE ventas
         SET comprador = ?, telefono = ?, estado_id = ?
         WHERE id = ?`,
        [comprador, telefono, estadoId, ventaId]
    );
}

export function deleteNumerosByVentaId(ventaId: number) {
    db.runSync(
        `DELETE FROM numeros
         WHERE venta_id = ?`,
        [ventaId]
    );
}

export function getTalonarioCantidadNumeros(talonarioId: number) {
    return db.getFirstSync<{ cantidad_numeros: number }>(
        `SELECT cantidad_numeros
         FROM talonarios
         WHERE id = ?`,
        [talonarioId]
    );
}

export function getTalonarioFecha(talonarioId: number) {
  const result = db.getFirstSync<{ fecha: string }>(
    `SELECT fecha
     FROM talonarios
     WHERE id = ?`,
    [talonarioId]
  );

  return result?.fecha ?? null;
}

export function getTalonarioStats(talonarioId: number) {
    return db.getFirstSync<{
        vendidos: number;
        disponibles: number;
        precio: number;
        total_esperado: number;
        recaudado: number;
        por_recaudar: number;
    }>(
        `
        SELECT
            COUNT(
                CASE
                    WHEN estados.nombre = 'Validado' THEN numeros.id
                END
            ) AS vendidos,

            t.cantidad_numeros -
            COUNT(
                CASE
                    WHEN estados.nombre = 'Validado' THEN numeros.id
                END
            ) AS disponibles,

            t.precio AS precio,

            t.cantidad_numeros * t.precio AS total_esperado,

            COUNT(
                CASE
                    WHEN estados.nombre = 'Validado' THEN numeros.id
                END
            ) * t.precio AS recaudado,

            (
                t.cantidad_numeros -
                COUNT(
                    CASE
                        WHEN estados.nombre = 'Validado' THEN numeros.id
                    END
                )
            ) * t.precio AS por_recaudar

        FROM talonarios t

        LEFT JOIN numeros
            ON numeros.talonario_id = t.id

        LEFT JOIN ventas
            ON ventas.id = numeros.venta_id

        LEFT JOIN estados
            ON estados.id = ventas.estado_id

        WHERE t.id = ?

        GROUP BY t.id
        `,
        [talonarioId]
    );
}