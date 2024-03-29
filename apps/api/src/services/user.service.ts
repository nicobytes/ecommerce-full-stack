import { users, userColumns } from '@src/db/schema';
import { HTTPException } from 'hono/http-exception';
import { CreateUserDto, UpdateUserDto } from '@src/dtos/user.dto';
import { eq } from "drizzle-orm";
import { DB } from '@src/types';
import bcrypt from 'bcryptjs';

export const getAllUsers = (db: DB) => {
  return db.query.users.findMany({
    columns: {
      password: false,
    },
  });
}

export const getUserById = async (db: DB, id: number) => {
  const entity = await db.query.users.findFirst({
    columns: {
      password: false,
    },
    where: eq(users.id, id)
  });
  if (!entity) {
    throw new HTTPException(400, { message: `User with id ${id} not found.` })
  }
  return entity;
}

export const createUser = async (db: DB, dto: CreateUserDto) => {
  const hashPassword = await bcrypt.hash(dto.password, 10);

  const { password, ...allColumns } = userColumns;

  const results = await db
    .insert(users)
    .values({
      ...dto,
      password: hashPassword,
    })
    .returning(allColumns);

  if (results.length === 0) {
    throw new HTTPException(400, { message: `Error` })
  }
  const [newEntity] = results;
  return newEntity;
}

export const updateUser = async (db: DB, id: number, dto: UpdateUserDto) => {
  const { password, ...columns } = userColumns;

  const results = await db
    .update(users)
    .set({ ...dto, updatedAt: new Date() })
    .where(eq(users.id, id))
    .returning(columns);

  if (results.length === 0) {
    throw new HTTPException(400, { message: `User with id ${id} not found.` })
  }
  const [entity] = results;
  return entity;
}

export const deleteUser = async (db: DB, id: number) => {
  const { password, ...columns } = userColumns;

  const results = await db
    .delete(users)
    .where(eq(users.id, id))
    .returning(columns);
  if (results.length === 0) {
    throw new HTTPException(400, { message: `User with id ${id} not found.` })
  }
  const [entity] = results;
  return entity;
}
