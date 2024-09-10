import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import {
  ProductIdSchema,
  ProductSchema,
  UpdateProductShema,
} from "@src/dtos/product.dto";
import { jwtMiddleware } from "@src/middlewares/jwt.middleware";
import { updateProduct } from "@src/services/products.service";
import type { App } from "@src/types";

const app = new OpenAPIHono<App>();

const route = createRoute({
  tags: ["products"],
  method: "put",
  path: "/{id}",
  request: {
    params: ProductIdSchema,
    body: {
      content: {
        "application/json": {
          schema: UpdateProductShema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: ProductSchema,
        },
      },
      description: "Retrieve updated product",
    },
  },
});

app.openapi(route, async (c) => {
  const db = c.get("db");
  const { id } = c.req.valid("param");
  const dto = c.req.valid("json");
  const rta = await updateProduct(db, +id, dto);
  return c.json(rta);
});

export default app;
