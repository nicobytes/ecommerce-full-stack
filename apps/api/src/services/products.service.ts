import { products } from '@src/db/schema';
import { HTTPException } from 'hono/http-exception';
import { CreateProductDto, UpdateProductDto, QueryParamsDto } from '@src/dtos/product.dto';
import { getCategoryById } from '@src/services/category.service';
import { DB } from '@src/types';
import { and, eq, SQL } from "drizzle-orm";

export const getAllProducts = (db: DB, query?: QueryParamsDto) => {
  const where: SQL[] = [];

  if (query && query.categoryId) {
    where.push(eq(products.categoryId, query.categoryId));
  }

  return db.query.products.findMany({
    with: {
      category: true,
    },
    where: and(...where),
  });
}

export const getProductById = async (db: DB, id: number) => {
  const product = await db.query.products.findFirst({
    where: eq(products.id, id),
    with: {
      category: true,
    }
  });
  if (!product) {
    throw new HTTPException(400, { message: `Product with id ${id} not found.` })
  }
  return product;
}

export const createProduct = async (db: DB, dto: CreateProductDto) => {
  await getCategoryById(db, dto.categoryId);
  const results = await db
    .insert(products)
    .values({...dto})
    .returning({ insertedId: products.id });

  if (results.length === 0) {
    throw new HTTPException(400, { message: `Error` })
  }
  const [newProduct] = results;
  return getProductById(db, newProduct.insertedId);
}

export const updateProduct = async (db: DB, id: number, dto: UpdateProductDto) => {
  const results = await db
    .update(products)
    .set({ ...dto, updatedAt: new Date() })
    .where(eq(products.id, id))
    .returning({ insertedId: products.id });

  if (results.length === 0) {
    throw new HTTPException(400, { message: `Product with id ${id} not found.` })
  }
  const [product] = results;
  return getProductById(db, product.insertedId);
}

export const deleteProduct = async (db: DB, id: number) => {
  const results = await db
    .delete(products)
    .where(eq(products.id, id))
    .returning();
  if (results.length === 0) {
    throw new HTTPException(400, { message: `Product with id ${id} not found.` })
  }
  const [product] = results;
  return product;
}
