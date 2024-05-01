import { HTTPException } from 'hono/http-exception';
import { sign } from 'hono/jwt';
import { getUserByEmail } from '@src/services/user.service';
import { DB } from '@src/types';
import bcrypt from 'bcryptjs';

export const validateAuth = async (db: DB, data: { email: string, password: string }) => {
  const user = await getUserByEmail(db, data.email);
  const isValidPassword = await bcrypt.compare(data.password, user.password);
  if (!isValidPassword) {
    throw new HTTPException(404, { message: `Invalid password` })
  }
  const { password, ...dataUser } = user;
  return dataUser;
}

export const generateAccessToken = async (userId: number, role: string, secret: string) => {
  const payload = {
    sub: `${userId}`,
    role: role,
    exp: Math.floor(Date.now() / 1000) + 60 * 1000,
  }
  return sign(payload, secret, "HS256");
}

export const doLogin = async (db: DB, data: { email: string, password: string }, secret: string) => {
  console.log('doLogin', data);
  const user = await validateAuth(db, data);
  console.log('user', user);
  const accessToken = await generateAccessToken(user.id, user.role, secret);
  console.log('accessToken', accessToken);
  return {
    access_token: accessToken,
  };
}
