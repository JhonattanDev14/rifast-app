
import { useCallback, useState } from "react";

import { getTalonarioById } from "@/features/talonarios/services/talonariosService";
import { getVentas } from "@/features/ventas/services/ventaService";

export function useNumerosAleatorios(
  talonarioId: number,
  numerosActuales = ""
) {
  const [cantidad, setCantidad] = useState("1");
  const [error, setError] = useState<string | null>(null);

  const generar = useCallback((): number[] | null => {
    const cantidadSolicitada = Number(cantidad);

    if (!Number.isInteger(cantidadSolicitada) || cantidadSolicitada < 1) {
      setError("Ingresa una cantidad válida.");
      return null;
    }

    const talonario = getTalonarioById(talonarioId);

    if (!talonario) {
      setError("No se encontró la rifa.");
      return null;
    }

    const ventas = getVentas(talonarioId);
    const ocupados = new Set<number>();

    ventas.forEach((venta) => {
      venta.numeros
        ?.split("#")
        .map(Number)
        .forEach((numero) => ocupados.add(numero));
    });

    // En edición, libera los números de la venta actual.
    numerosActuales
      .split("#")
      .map(Number)
      .filter(Number.isFinite)
      .forEach((numero) => ocupados.delete(numero));

    const disponibles = Array.from(
      { length: talonario.cantidad_numeros },
      (_, i) => i + 1
    ).filter((numero) => !ocupados.has(numero));

    if (disponibles.length < cantidadSolicitada) {
      setError("No hay suficientes números disponibles.");
      return null;
    }

    for (let i = disponibles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [disponibles[i], disponibles[j]] = [
        disponibles[j],
        disponibles[i],
      ];
    }

    setError(null);

    return disponibles.slice(0, cantidadSolicitada);
  }, [cantidad, talonarioId, numerosActuales]);

  return { cantidad, setCantidad, generar, error };
}
