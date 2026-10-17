
import { useMemo } from "react";
import { getVentas } from "@/features/ventas/services/ventaService";
import { getTalonarioById } from "@/features/talonarios/services/talonariosService";

export function useNumerosDisponibles(talonarioId: number) {
    return useMemo(() => {
        const talonario = getTalonarioById(talonarioId);

        if (!talonario) return [];

        const ventas = getVentas(talonarioId);

        const ocupados = new Set(
            ventas.flatMap((venta) =>
                venta.numeros
                    .split("#")
                    .map(Number)
                    .filter(Number.isFinite)
            )
        );

        return Array.from(
            { length: talonario.cantidad_numeros },
            (_, i) => i + 1
        ).filter((numero) => !ocupados.has(numero));
    }, [talonarioId]);
}
