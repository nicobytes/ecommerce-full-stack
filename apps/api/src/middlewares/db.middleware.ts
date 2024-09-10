import * as schema from "@src/db/schema";
import type { App } from "@src/types";
import { drizzle } from "drizzle-orm/d1";
import { createFactory } from "hono/factory";

const factory = createFactory<App>();

export const dbMiddleware = factory.createMiddleware(async (c, next) => {
  const db = drizzle(c.env.DB_STORE, { schema });
  c.set("db", db);
  await next();
});
