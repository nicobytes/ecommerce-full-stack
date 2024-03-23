import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import { ProductIdSchema, ProductSchema } from '@src/dtos/product.dto';
import { getProductById } from '@src/services/products.service';
import { App } from "@src/types";

const app = new OpenAPIHono<App>();

const route = createRoute({
  tags: ['product'],
  method: 'get',
  path: '/{id}',
  request: {
    params: ProductIdSchema,
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: ProductSchema,
        },
      },
      description: 'Retrieve the product',
    },
  },
});

app.openapi(route, async (c) => {
  const db = c.get('db');
  const { id } = c.req.valid('param');
  const result = await getProductById(db, +id);
  return c.json(result);
});

export default app;
