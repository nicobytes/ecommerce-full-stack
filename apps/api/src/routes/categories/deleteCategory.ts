import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import { CategorySchema, CategoryIdSchema } from '@src/dtos/category.dto';
import { deleteCategory } from '@src/services/category.service';
import { App } from "@src/types";

const app = new OpenAPIHono<App>();

const route = createRoute({
  tags: ['category'],
  method: 'delete',
  path: '/{id}',
  request: {
    params: CategoryIdSchema,
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: CategorySchema,
        },
      },
      description: 'Retrieve deleted category',
    },
  },
});

app.openapi(route, async (c) => {
  const db = c.get('db');
  const { id }  = c.req.valid('param');
  const rta = await deleteCategory(db, +id);
  return c.json(rta);
});

export default app;
