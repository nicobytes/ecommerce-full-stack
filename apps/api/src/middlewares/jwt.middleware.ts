import type { App } from "@src/types";
import { createFactory } from "hono/factory";
import { jwt } from "hono/jwt";

const factory = createFactory<App>();

export const jwtMiddleware = factory.createMiddleware(async (c, next) => {
  const jwtMiddleware = jwt({
    secret: c.env.JWT_SECRET,
  });
  return jwtMiddleware(c, next);
});
