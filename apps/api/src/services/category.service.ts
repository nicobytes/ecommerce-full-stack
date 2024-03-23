import { categories } from '@src/db/schema';
import { HTTPException } from 'hono/http-exception';
import { CreateCategoryDto, UpdateCategoryDto } from '@src/dtos/category.dto';
import { eq } from "drizzle-orm";
import { DB } from '@src/types';

export const getAllCategories = (db: DB) => {
  return db.query.categories.findMany();
}

export const getCategoryById = async (db: DB, id: number) => {
  const category = await db.query.categories.findFirst({
    where: eq(categories.id, id),
  });
  if (!category) {
    throw new HTTPException(400, { message: `Category with id ${id} not found.` })
  }
  return category;
}

export const createCategory = async (db: DB, dto: CreateCategoryDto) => {
  const results = await db
    .insert(categories)
    .values({...dto})
    .returning();

  if (results.length === 0) {
    throw new HTTPException(400, { message: `Error` })
  }
  const [newCategory] = results;
  return newCategory;
}

export const updateCategory = async (db: DB, id: number, dto: UpdateCategoryDto) => {
  const results = await db
    .update(categories)
    .set({ ...dto, updatedAt: new Date() })
    .where(eq(categories.id, id))
    .returning();

  if (results.length === 0) {
    throw new HTTPException(400, { message: `Category with id ${id} not found.` })
  }
  const [newCategory] = results;
  return newCategory;
}


export const deleteCategory = async (db: DB, id: number) => {
  const results = await db
    .delete(categories)
    .where(eq(categories.id, id))
    .returning();
  if (results.length === 0) {
    throw new HTTPException(400, { message: `Category with id ${id} not found.` })
  }
  return results[0];
}
