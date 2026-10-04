import { z } from 'zod';

export function validateForm(
  data: unknown,
  schema: z.ZodType
) {
  const result = schema.safeParse(data);

  if (result.success) {
    return {
      success: true,
      data: result.data,
      errors: {},
    };
  }

  const errors: Record<string, string> = {};

  result.error.issues.forEach((issue) => {
    const field = issue.path[0];

    if (typeof field === 'string') {
      errors[field] = issue.message;
    }
  });

  return {
    success: false,
    data: null,
    errors,
  };
}