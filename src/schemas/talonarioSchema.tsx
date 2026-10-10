import { z } from 'zod';

export const talonarioSchema = z.object({
  nombre: z
    .string()
    .min(1, 'El nombre es obligatorio')
    .max(100, 'El nombre es demasiado largo'),

  precio: z
    .number()
    .int('El precio debe ser un número entero')
    .positive('El precio debe ser mayor a 0'),

  cantidad: z
    .number()
    .int('La cantidad debe ser un número entero')
    .positive('La cantidad debe ser mayor a 0'),

  ganadores: z
    .number()
    .int('La cantidad de ganadores debe ser un número entero')
    .positive('La cantidad de ganadores debe ser mayor a 0'),

  fecha: z
    .string()
    .min(1, 'La fecha es obligatoria'),
});

export type TalonarioInput = z.infer<typeof talonarioSchema>;