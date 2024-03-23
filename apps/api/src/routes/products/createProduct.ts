import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import { CreateProductSchema, ProductSchema } from '@src/dtos/product.dto';
import { createProduct } from '@src/services/products.service';
import { App } from "@src/types";

const app = new OpenAPIHono<App>();

const route = createRoute({
  tags: ['product'],
  method: 'post',
  path: '/',
  request: {
    body: {
      content: {
        'application/json': {
          schema: CreateProductSchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: ProductSchema,
        },
      },
      description: 'Retrieve new product',
    },
  },
});

app.openapi(route, async (c) => {
  const db = c.get('db');
  const dto = c.req.valid('json');
  const rta = await createProduct(db, dto);
  return c.json(rta);
});

export default app;
