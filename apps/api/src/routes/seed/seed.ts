import { seed } from "@src/services/seed.service";
import type { App } from "@src/types";
import { Hono } from "hono";

const app = new Hono<App>();

app.post("/", async (c) => {
  const db = c.get("db");
  const rta = await seed(db);
  return c.json(rta);
});

export default app;
