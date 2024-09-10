import type { Bindings } from "@src/bindings";
import type * as schema from "@src/db/schema";
import type { DrizzleD1Database } from "drizzle-orm/d1";

export type DB = DrizzleD1Database<typeof schema>;

export type App = {
  Bindings: Bindings;
  Variables: { db: DB };
};
