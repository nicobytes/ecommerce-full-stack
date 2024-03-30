import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import { UserIdSchema, UserSchemaResponse } from '@src/dtos/user.dto';
import { deleteUser } from '@src/services/user.service';
import { jwtMiddleware } from '@src/middlewares/jwt.middleware';
import { App } from "@src/types";

const app = new OpenAPIHono<App>();

const route = createRoute({
  tags: ['users'],
  method: 'delete',
  path: '/{id}',
  request: {
    params: UserIdSchema,
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: UserSchemaResponse,
        },
      },
      description: 'Retrieve deleted user',
    },
  },
});

app.openapi(route, async (c) => {
  const db = c.get('db');
  const { id }  = c.req.valid('param');
  const rta = await deleteUser(db, +id);
  return c.json(rta);
});

export default app;
