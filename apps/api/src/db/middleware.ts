import { createMiddleware } from 'hono/factory';
import { drizzle } from 'drizzle-orm/d1';
import * as schema from '@src/db/schema';

export const dbMiddleware = createMiddleware(async (c, next) => {
  const db = drizzle(c.env.DB_STORE, { schema });
  c.set('db', db);
  await next();
});
