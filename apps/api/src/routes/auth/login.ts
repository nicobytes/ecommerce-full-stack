import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import { LoginSchema, ResponseSchema } from '@src/dtos/auth.dto';
import { doLogin } from '@src/services/auth.service';
import { App } from "@src/types";

const app = new OpenAPIHono<App>();

const route = createRoute({
  tags: ['auth'],
  method: 'post',
  path: '/',
  request: {
    body: {
      content: {
        'application/json': {
          schema: LoginSchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: ResponseSchema,
        },
      },
      description: 'Retrieve the access token.',
    },
  },
});

app.openapi(route, async (c) => {
  const db = c.get('db');
  const jwtSecret = c.env.JWT_SECRET;
  const dto = c.req.valid('json');
  const rta = await doLogin(db, dto, jwtSecret);
  return c.json(rta);
});

export default app;
