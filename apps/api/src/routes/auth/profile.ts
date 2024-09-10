import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import { UserSchemaResponse } from "@src/dtos/user.dto";
import { getUserById } from "@src/services/user.service";
import type { App } from "@src/types";
import { HTTPException } from "hono/http-exception";
import { verify } from "hono/jwt";

const app = new OpenAPIHono<App>();

const route = createRoute({
  tags: ["auth"],
  method: "get",
  path: "/",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: UserSchemaResponse,
        },
      },
      description: "Retrieve the access token.",
    },
  },
});

app.openapi(route, async (c) => {
  const db = c.get("db");
  const jwtSecret = c.env.JWT_SECRET;
  const authorization = c.req.header("Authorization");
  if (!authorization) {
    throw new HTTPException(401);
  }

  const tokenToVerify = authorization.replace("Bearer ", "");
  const decodedPayload = (await verify(tokenToVerify, jwtSecret, "HS256")) as {
    sub: string;
    role: string;
  };
  const user = await getUserById(db, +decodedPayload.sub);
  return c.json(user);
});

export default app;
