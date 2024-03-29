import { z } from '@hono/zod-openapi';
import { userRoles } from '@src/db/schema';

export const UserIdSchema = z.object({
  id: z
    .string()
    .min(1)
    .openapi({
      param: {
        name: 'id',
        in: 'path',
      },
      example: '1',
    }),
});

export const UserSchema = z
  .object({
    id: z.number().openapi({
      example: 1,
    }),
    name: z
      .string()
      .min(4)
      .openapi({
        example: 'Nicolas',
      }),
    email: z
      .string()
      .email()
      .openapi({
        example: 'nico@gmail.com',
      }),
    password: z
      .string()
      .min(6)
      .openapi({
        example: '123456',
      }),
    role: z
      .enum(userRoles)
      .openapi({
        example: 'customer',
      }),
    avatar: z
      .string()
      .url()
      .openapi({
        example: 'https://randomuser.me/api/portraits/lego/5.jpg',
      }),
  })
  .openapi('User');

export type UserModel = z.infer<typeof UserSchema>;
export const UserSchemaResponse = UserSchema.omit({ password: true });

export const CreateUserSchema = UserSchema.omit({ id: true });
export type CreateUserDto = z.infer<typeof CreateUserSchema>;

export const UserListSchema = z.array(UserSchemaResponse);

export const UpdateUserShema = CreateUserSchema.partial();
export type UpdateUserDto = z.infer<typeof UpdateUserShema>;
