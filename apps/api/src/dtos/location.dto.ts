import { z } from '@hono/zod-openapi';

export const LocationSchema = z
  .object({
    id: z.number().openapi({
      example: 1,
    }),
    name: z.string().openapi({
      example: 'John Doe',
    }),
    description: z.string().openapi({
      example: 'Description',
    }),
    latitude: z.number().openapi({
      example: 1.234,
    }),
    longitude: z.number().openapi({
      example: 1.234,
    }),
  })
  .openapi('Location');

export const LocationsSchema = z.array(LocationSchema);
