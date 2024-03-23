import { products } from '@src/db/schema';
import { HTTPException } from 'hono/http-exception';
import { CreateProductDto } from '@src/dtos/product.dto';
import { eq } from "drizzle-orm";
import { DB } from '@src/types';

export const getAllProducts = (db: DB) => {
  return db.query.products.findMany({
    with: {
      category: true,
    }
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
