import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import { CreateUserSchema, UserSchemaResponse } from '@src/dtos/user.dto';
import { createUser } from '@src/services/user.service';
import { App } from "@src/types";

const app = new OpenAPIHono<App>();

const route = createRoute({
  tags: ['users'],
  method: 'post',
  path: '/',
  request: {
    body: {
      content: {
        'application/json': {
          schema: CreateUserSchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: UserSchemaResponse,
        },
      },
      description: 'Retrieve new user',
    },
  },
});

app.openapi(route, async (c) => {
  const db = c.get('db');
  const dto = c.req.valid('json');
  const rta = await createUser(db, dto);
  return c.json(rta);
});

export default app;
