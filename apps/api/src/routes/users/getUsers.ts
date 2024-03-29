import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import { UserListSchema } from '@src/dtos/user.dto';
import { getAllUsers } from '@src/services/user.service';
import { App } from "@src/types";

const app = new OpenAPIHono<App>();

const route = createRoute({
  tags: ['users'],
  method: 'get',
  path: '/',
  responses: {
    200: {
      content: {
        'application/json': {
          schema: UserListSchema,
        },
      },
      description: 'Retrieve all users',
    },
  },
});

app.openapi(route, async (c) => {
  const db = c.get('db');
  const results = await getAllUsers(db);
  return c.json(results);
});

export default app;
