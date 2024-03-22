import { z } from '@hono/zod-openapi';

export const CategoryIdSchema = z.object({
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

export const CreateCategorySchema = z.object({
  name: z
    .string()
    .min(3)
    .openapi({
      example: 'Male',
    }),
  image: z
    .string()
    .openapi({
      example: 'https://api.lorem.space/image/book?w=150&h=220',
    }),
});
export type CreateCategoryDto = z.infer<typeof CreateCategorySchema>;

export const UpdateCategoryShema = CreateCategorySchema.partial();
export type UpdateCategoryDto = z.infer<typeof UpdateCategoryShema>;

export const CategorySchema = z
  .object({
    id: z.number().openapi({
      example: 1,
    }),
    name: z.string().openapi({
      example: 'John Doe',
    }),
    image: z.string().openapi({
      example: 'as',
    }),
  })
  .openapi('Category');

export const CatergoriesSchema = z.array(CategorySchema);
