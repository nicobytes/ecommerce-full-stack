import { OpenAPIHono } from "@hono/zod-openapi";
import { createRoute } from '@hono/zod-openapi';
import { CreateCategorySchema, CategorySchema } from '@src/dtos/category.dto';
import { createCategory } from '@src/services/category.service';
import { App } from "@src/types";

const app = new OpenAPIHono<App>();

const route = createRoute({
  tags: ['category'],
  method: 'post',
  path: '/',
  request: {
    body: {
      content: {
        'application/json': {
          schema: CreateCategorySchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: CategorySchema,
        },
      },
      description: 'Retrieve new category',
    },
  },
});

app.openapi(route, async (c) => {
  const db = c.get('db');
  const dto = c.req.valid('json');
  const rta = await createCategory(db, dto);
  return c.json(rta);
});

export default app;
