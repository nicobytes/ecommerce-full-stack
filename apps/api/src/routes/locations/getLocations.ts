import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import { LocationsSchema, QueryParamsSchema } from "@src/dtos/location.dto";
import { getAllLocations } from "@src/services/location.service";
import type { App } from "@src/types";

const app = new OpenAPIHono<App>();

const route = createRoute({
  tags: ["location"],
  method: "get",
  path: "/",
  request: {
    query: QueryParamsSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: LocationsSchema,
        },
      },
      description: "Retrieve all locations",
    },
  },
});

app.openapi(route, (c) => {
  const { size, origin } = c.req.valid("query");
  const results = getAllLocations(origin, size);
  return c.json(results);
});

export default app;
