import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import {
  CategoryIdSchema,
  CategorySchema,
  UpdateCategoryShema,
} from "@src/dtos/category.dto";
import { updateCategory } from "@src/services/category.service";
import type { App } from "@src/types";

const app = new OpenAPIHono<App>();

const route = createRoute({
  tags: ["category"],
  method: "put",
  path: "/{id}",
  request: {
    params: CategoryIdSchema,
    body: {
      content: {
        "application/json": {
          schema: UpdateCategoryShema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: CategorySchema,
        },
      },
      description: "Retrieve updated category",
    },
  },
});

app.openapi(route, async (c) => {
  const db = c.get("db");
  const { id } = c.req.valid("param");
  const dto = c.req.valid("json");
  const rta = await updateCategory(db, +id, dto);
  return c.json(rta);
});

export default app;
