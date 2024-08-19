import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import { LocationsSchema } from '@src/dtos/location.dto';
import { getAllLocations } from '@src/services/location.service';
import { App } from "@src/types";

const app = new OpenAPIHono<App>();

const route = createRoute({
  tags: ['location'],
  method: 'get',
  path: '/',
  responses: {
    200: {
      content: {
        'application/json': {
          schema: LocationsSchema,
        },
      },
      description: 'Retrieve all locations',
    },
  },
});

app.openapi(route, (c) => {
  const results = getAllLocations();
  return c.json(results);
});

export default app;
