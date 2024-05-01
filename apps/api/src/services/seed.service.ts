import { DB } from '@src/types';
import { users, products, categories } from '@src/db/schema';
import bcrypt from 'bcryptjs';
import { Users, Categories, Products } from '@src/db/dataset';

export const seed = async (db: DB) => {
  await db.delete(products);
  await db.delete(categories);
  await db.delete(users);

  const usersData = Users.map((item) => ({
    ...item,
    password: bcrypt.hashSync(item.password, 10),
  }));
  const rtaUsers = await db.insert(users).values(usersData);
  const rtaCategories = await db.insert(categories).values(Categories);
  const productsData = Products.map((item) => ({
    ...item,
    categoryId: +item.category_id,
    images: item.images.split(',')
  }));
  await db.insert(products).values(productsData.slice(0,20));
  await db.insert(products).values(productsData.slice(20,40));
  await db.insert(products).values(productsData.slice(40,-1));

  return {
    users: rtaUsers.meta.changes,
    categories: rtaCategories.meta.changes,
    products: productsData.length,
  }
}
