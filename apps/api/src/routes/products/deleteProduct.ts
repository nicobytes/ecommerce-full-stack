import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import { ProductSchema, ProductIdSchema } from '@src/dtos/product.dto';
import { deleteProduct } from '@src/services/products.service';
import { jwtMiddleware } from '@src/middlewares/jwt.middleware';
import { App } from "@src/types";

const app = new OpenAPIHono<App>();

const route = createRoute({
  tags: ['products'],
  method: 'delete',
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
      description: 'Retrieve deleted product',
    },
  },
});

app.openapi(route, async (c) => {
  const db = c.get('db');
  const { id }  = c.req.valid('param');
  const rta = await deleteProduct(db, +id);
  return c.json(rta);
});

export default app;
