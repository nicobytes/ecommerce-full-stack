import { z } from '@hono/zod-openapi';

export const LoginSchema = z.object({
  email: z
    .string()
    .email()
    .openapi({
      example: 'nico@gmail.com',
    }),
  password: z
    .string()
    .min(6)
    .openapi({
      example: '123456',
    }),
});

export const ResponseSchema = z.object({
  access_token: z.string(),
});
