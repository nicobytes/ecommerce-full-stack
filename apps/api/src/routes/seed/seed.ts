import { Hono } from 'hono';
import { App } from "@src/types";
import { seed } from '@src/services/seed.service';

const app = new Hono<App>();

app.post('/', async (c) => {
  const db = c.get('db');
  const rta = await seed(db);
  return c.json(rta);
});

export default app;
