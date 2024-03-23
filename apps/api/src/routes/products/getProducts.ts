import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import { ProductListSchema } from '@src/dtos/product.dto';
import { getAllProducts } from '@src/services/products.service';
import { App } from "@src/types";

const app = new OpenAPIHono<App>();

const route = createRoute({
  tags: ['product'],
  method: 'get',
  path: '/',
  responses: {
    200: {
      content: {
        'application/json': {
          schema: ProductListSchema,
        },
      },
      description: 'Retrieve all products',
    },
  },
});

app.openapi(route, async (c) => {
  const db = c.get('db');
  const results = await getAllProducts(db);
  return c.json(results);
});

export default app;
