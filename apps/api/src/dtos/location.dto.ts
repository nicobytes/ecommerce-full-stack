import { z } from "@hono/zod-openapi";
import isLatLong from "validator/lib/isLatLong";

export const LocationSchema = z
  .object({
    id: z.number().openapi({
      example: 1,
    }),
    name: z.string().openapi({
      example: "John Doe",
    }),
    description: z.string().openapi({
      example: "Description",
    }),
    latitude: z.number().openapi({
      example: 1.234,
    }),
    longitude: z.number().openapi({
      example: 1.234,
    }),
  })
  .openapi("Location");

export const LocationsSchema = z.array(LocationSchema);

export const QueryParamsSchema = z.object({
  radius: z.coerce
    .number()
    .optional()
    .openapi({
      param: {
        name: "radius",
        in: "query",
      },
      example: 10,
    })
    .default(10),
  size: z.coerce
    .number()
    .optional()
    .openapi({
      param: {
        name: "size",
        in: "query",
      },
      example: 15,
    })
    .default(15),
  origin: z
    .string()
    .optional()
    .openapi({
      param: {
        name: "origin",
        in: "query",
      },
      example: "4.6482784,-74.2726198",
    })
    .default("4.6482784,-74.2726198")
    .transform((v) => {
      const [latitude, longitude] = v.split(",");
      return { latitude, longitude };
    })
    .refine(
      ({ latitude, longitude }) => {
        return !isLatLong(latitude) && !isLatLong(longitude);
      },
      {
        message: "Invalid origin",
      },
    )
    .transform((v) => {
      return {
        latitude: Number.parseFloat(v.latitude),
        longitude: Number.parseFloat(v.longitude),
      };
    }),
});
export type QueryParamsDto = z.infer<typeof QueryParamsSchema>;
