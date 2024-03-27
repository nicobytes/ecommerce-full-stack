import { OpenAPIHono } from '@hono/zod-openapi';
import { swaggerUI } from "@hono/swagger-ui";
import { cors } from "hono/cors";
import { prettyJSON } from 'hono/pretty-json';
import { dbMiddleware } from '@src/db/middleware';

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

const app = new OpenAPIHono();
app.use("*", cors());
app.use('*', prettyJSON());

app.use('/api/v1/*', dbMiddleware);

app.route('/api/v1/categories', getCategories);
app.route('/api/v1/categories', createCategory);
app.route('/api/v1/categories', getCategory);
app.route('/api/v1/categories', updateCategory);
app.route('/api/v1/categories', deleteCategory);

app.route('/api/v1/products', createProduct);
app.route('/api/v1/products', getProducts);
app.route('/api/v1/products', getProduct);
app.route('/api/v1/products', updateProduct);
app.route('/api/v1/products', deleteProduct);

app.get("/ui", swaggerUI({ url: "/docs" }));
app.doc("/docs", {
  info: {
    title: "Fake Store API",
    version: "v1",
  },
  openapi: "3.1.0",
});

export default app;
