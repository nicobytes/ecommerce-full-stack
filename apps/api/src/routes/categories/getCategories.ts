import { OpenAPIHono } from "@hono/zod-openapi";
import { createRoute } from '@hono/zod-openapi';
import { CatergoriesSchema } from '@src/dtos/category.dto';
import { getAllCategories } from '@src/services/category.service';
import { App } from "@src/types";

const app = new OpenAPIHono<App>();

const route = createRoute({
  tags: ['category'],
  method: 'get',
  path: '/',
  responses: {
    200: {
      content: {
        'application/json': {
          schema: CatergoriesSchema,
        },
      },
      description: 'Retrieve all categories',
    },
  },
});

app.openapi(route, async (c) => {
  const db = c.get('db');
  const results = await getAllCategories(db);
  return c.json(results);
});

export default app;
