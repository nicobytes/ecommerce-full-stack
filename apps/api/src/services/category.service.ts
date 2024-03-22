import { categories } from '@src/db/schema';
import { CreateCategoryDto, UpdateCategoryDto } from '@src/dtos/category.dto';
import { eq } from "drizzle-orm";
import { DB } from '@src/types';

export const getAllCategories = (db: DB) => {
  return db.query.categories.findMany();
}

export const getCategoryById = async (db: DB, id: number) => {
  const results = await db.select().from(categories).where(eq(categories.id, id));
  if (results.length === 0) {
    throw new Error('not found');
  }
  return results[0];
}

export const createCategory = async (db: DB, dto: CreateCategoryDto) => {
  const [newCategory] = await db.insert(categories).values({
    name: dto.name,
    image: dto.image
  }).returning();
  return newCategory;
}

export const updateCategory = async (db: DB, id: number, dto: UpdateCategoryDto) => {
  const [category] = await db.update(categories)
    .set({ ...dto, updatedAt: new Date() })
    .where(eq(categories.id, id))
    .returning();
  return category;
}
