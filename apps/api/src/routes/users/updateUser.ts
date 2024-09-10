import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import {
  UpdateUserShema,
  UserIdSchema,
  UserSchemaResponse,
} from "@src/dtos/user.dto";
import { jwtMiddleware } from "@src/middlewares/jwt.middleware";
import { updateUser } from "@src/services/user.service";
import type { App } from "@src/types";

const app = new OpenAPIHono<App>();

const route = createRoute({
  tags: ["users"],
  method: "put",
  path: "/{id}",
  request: {
    params: UserIdSchema,
    body: {
      content: {
        "application/json": {
          schema: UpdateUserShema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: UserSchemaResponse,
        },
      },
      description: "Retrieve updated user",
    },
  },
});

app.openapi(route, async (c) => {
  const db = c.get("db");
  const { id } = c.req.valid("param");
  const dto = c.req.valid("json");
  const rta = await updateUser(db, +id, dto);
  return c.json(rta);
});

export default app;
