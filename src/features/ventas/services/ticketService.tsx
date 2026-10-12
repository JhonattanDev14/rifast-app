
import type { Venta } from "@/types/venta";
import { getTalonarioFecha } from "../repositories/ventaRepository";

export function prepararTicket(
  venta: Venta,
  estados: { id: number; nombre: string }[],
  talonarioId: number,
  precio: number
) {
  return {
    comprador: venta.comprador,
    telefono: venta.telefono,
    numeros: venta.numeros.split("#").map(Number),
    estado:
      estados.find((item) => item.id === venta.estado_id)?.nombre ??
      "Desconocido",
    fecha: getTalonarioFecha(talonarioId) ?? "",
    precio,
  };
}
