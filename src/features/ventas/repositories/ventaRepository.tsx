import { db } from "@/database/database";

export function getVentas(talonarioId: number) {
    return db.getAllSync<{
        id: number;
        talonario_id: number;
        comprador: string;
        telefono: string;
        estado_id: number;
        fecha: string;
        numeros: string;
        estado: string;
        precio: number;
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
    telefono: string,
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
    telefono: string,
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
    return db.getFirstSync<{
        cantidad_numeros: number;
        fecha: string;
    }>(
        `SELECT cantidad_numeros, fecha
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

export function getNumerosParaSorteo(talonarioId: number) {
    return db.getAllSync<{
        numero: number;
        venta_id: number;
        comprador: string;
        telefono: string;
    }>(
        `
        SELECT
            numeros.numero,
            ventas.id AS venta_id,
            ventas.comprador,
            ventas.telefono
        FROM numeros
        INNER JOIN ventas
            ON ventas.id = numeros.venta_id
        INNER JOIN estados
            ON estados.id = ventas.estado_id
        WHERE numeros.talonario_id = ?
        AND estados.nombre = 'Validado'
        `,
        [talonarioId]
    );
}

export function getNumerosSorteados(talonarioId: number) {
    return db.getAllSync<{ numero: number }>(
        `SELECT numero
         FROM sorteos
         WHERE talonario_id = ?`,
        [talonarioId]
    );
}

export function insertSorteo(
    talonarioId: number,
    numero: number,
    fecha: string
) {
    db.runSync(
        `INSERT INTO sorteos
         (talonario_id, numero, fecha)
         VALUES (?, ?, ?)`,
        [talonarioId, numero, fecha]
    );
}

export function getTalonarioCantidadGanadores(talonarioId: number) {
    return db.getFirstSync<{ cantidad_ganadores: number }>(
        `SELECT cantidad_ganadores
         FROM talonarios
         WHERE id = ?`,
        [talonarioId]
    );
}

export function getGanadoresSorteo(talonarioId: number) {
    return db.getAllSync<{
        numero: number;
        comprador: string;
        telefono: string;
        fecha: string;
    }>(
        `
        SELECT
            sorteos.numero,
            ventas.comprador,
            ventas.telefono,
            sorteos.fecha
        FROM sorteos
        INNER JOIN numeros
            ON numeros.talonario_id = sorteos.talonario_id
            AND numeros.numero = sorteos.numero
        INNER JOIN ventas
            ON ventas.id = numeros.venta_id
        WHERE sorteos.talonario_id = ?
        ORDER BY sorteos.id ASC
        `,
        [talonarioId]
    );
}