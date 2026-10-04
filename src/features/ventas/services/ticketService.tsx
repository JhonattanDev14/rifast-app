import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

import type { Venta } from "@/types/venta";
import { crearTicketTemplate } from "../templates/ticketTemplate";
import { getTalonarioFecha } from "../repositories/ventaRepository";

export async function generarTicket(
  venta: Venta,
  estados: { id: number; nombre: string }[],
  talonarioId: number
){
  const numeros = venta.numeros
    .split("#")
    .map(Number);

  const estado =
    estados.find((item) => item.id === venta.estado_id)?.nombre ??
    "Desconocido";

    const fechaSorteo = getTalonarioFecha(talonarioId);

    const html = crearTicketTemplate({
        comprador: venta.comprador,
        telefono: venta.telefono,
        numeros,
        estado,
        fecha: fechaSorteo ?? "",
    });

  const { uri } = await Print.printToFileAsync({
    html,
    width: 227,
    height: 300,
    });

  if (await Sharing.isAvailableAsync()) {
    await Sharing.shareAsync(uri, {
      mimeType: "application/pdf",
      dialogTitle: "Compartir ticket",
    });
  }

  return uri;
}