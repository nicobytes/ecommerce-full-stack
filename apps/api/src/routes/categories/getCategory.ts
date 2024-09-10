import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import { CategoryIdSchema, CategorySchema } from "@src/dtos/category.dto";
import { getCategoryById } from "@src/services/category.service";
import type { App } from "@src/types";

const app = new OpenAPIHono<App>();

const route = createRoute({
  tags: ["category"],
  method: "get",
  path: "/{id}",
  request: {
    params: CategoryIdSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: CategorySchema,
        },
      },
      description: "Retrieve the category",
    },
  },
});

app.openapi(route, async (c) => {
  const db = c.get("db");
  const { id } = c.req.valid("param");
  const result = await getCategoryById(db, +id);
  return c.json(result);
});

export default app;
