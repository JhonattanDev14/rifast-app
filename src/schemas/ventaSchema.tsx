import { z } from "zod";

export const ventaSchema = z.object({
  numeros: z
    .string()
    .min(1, "Ingresa al menos un número")
    .refine(
      (value) =>
        value
          .split("#")
          .every((numero) => /^\d+$/.test(numero.trim())),
      "Usa números separados por #"
    ),

  comprador: z
    .string()
    .min(1, "Ingresa el nombre del comprador"),

  telefono: z
    .string()
    .min(7, "Ingresa un teléfono válido"),

  estadoId: z.number().int().positive(),

  fecha: z.string().nullable(),
});

export type VentaInput = z.infer<typeof ventaSchema>;