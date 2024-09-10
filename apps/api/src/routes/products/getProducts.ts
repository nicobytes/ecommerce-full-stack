import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import { ProductListSchema, QueryParamsSchema } from "@src/dtos/product.dto";
import { getAllProducts } from "@src/services/products.service";
import type { App } from "@src/types";

const app = new OpenAPIHono<App>();

const route = createRoute({
  tags: ["products"],
  method: "get",
  path: "/",
  request: {
    query: QueryParamsSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: ProductListSchema,
        },
      },
      description: "Retrieve all products",
    },
  },
});

app.openapi(route, async (c) => {
  const db = c.get("db");
  const query = c.req.valid("query");
  const results = await getAllProducts(db, query);
  return c.json(results);
});

export default app;
