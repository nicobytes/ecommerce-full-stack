import { OpenAPIHono } from '@hono/zod-openapi';
import { swaggerUI } from "@hono/swagger-ui";
import { cors } from "hono/cors";
import { prettyJSON } from 'hono/pretty-json';

import { dbMiddleware } from '@src/middlewares/db.middleware';
import { jwtMiddleware } from '@src/middlewares/jwt.middleware';

import getCategories from '@src/routes/categories/getCategories';
import createCategory from '@src/routes/categories/createCategory';
import getCategory from '@src/routes/categories/getCategory';
import updateCategory from '@src/routes/categories/updateCategory';
import deleteCategory from '@src/routes/categories/deleteCategory';

import createProduct from '@src/routes/products/createProduct';
import getProducts from '@src/routes/products/getProducts';
import getProduct from '@src/routes/products/getProduct';
import updateProduct from '@src/routes/products/updateProduct';
import deleteProduct from '@src/routes/products/deleteProduct';

import createUser from '@src/routes/users/createUser';
import getUsers from '@src/routes/users/getUsers';
import getUser from '@src/routes/users/getUser';
import updateUser from '@src/routes/users/updateUser';
import deleteUser from '@src/routes/users/deleteUser';
import getLocations from '@src/routes/locations/getLocations';
import seed from '@src/routes/seed/seed';

import login from '@src/routes/auth/login';
import profile from '@src/routes/auth/profile';

const app = new OpenAPIHono();
app.use("*", cors());
app.use('*', prettyJSON());
app.notFound((c) => c.json({ message: 'Not Found', ok: false }, 404));

app.use('/api/v1/*', dbMiddleware);

// Public paths

app.route('/api/v1/auth/login', login);

app.route('/api/v1/categories', getCategories);
app.route('/api/v1/categories', getCategory);

app.route('/api/v1/products', getProducts);
app.route('/api/v1/products', getProduct);

app.route('/api/v1/users', getUsers);
app.route('/api/v1/users', getUser);
app.route('/api/v1/users', createUser);
app.route('/api/v1/seed', seed);

app.route('/api/v1/locations', getLocations);

// Private paths

app.use('/api/v1/*', jwtMiddleware);

app.route('/api/v1/auth/profile', profile);

app.route('/api/v1/categories', createCategory);
app.route('/api/v1/categories', updateCategory);
app.route('/api/v1/categories', deleteCategory);

app.route('/api/v1/products', createProduct);
app.route('/api/v1/products', updateProduct);
app.route('/api/v1/products', deleteProduct);

app.route('/api/v1/users', updateUser);
app.route('/api/v1/users', deleteUser);

app.get("/", swaggerUI({ url: "/docs" }));
app.doc("/docs", {
  info: {
    title: "Fake Store API",
    version: "v1",
  },
  openapi: "3.1.0",
});

export default app;
