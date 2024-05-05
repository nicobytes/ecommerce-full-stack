import { z } from '@hono/zod-openapi';

export const ProductIdSchema = z.object({
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

export const ProductSchema = z
  .object({
    id: z.number().openapi({
      example: 1,
    }),
    title: z
      .string()
      .min(4)
      .openapi({
        example: 'Male',
      }),
    price: z
      .number()
      .gte(0)
      .openapi({
        example: 100,
      }),
    description: z
      .string()
      .min(4)
      .openapi({
        example: '---',
      }),
    images: z
      .string()
      .array()
      .min(1)
      .openapi({
        example: ['https://api.lorem.space/image/book?w=150&h=220'],
      }),
    categoryId: z
      .number()
      .openapi({
        example: 1,
      }),
  })
  .openapi('Product');

export const CreateProductSchema = ProductSchema.omit({ id: true });
export type CreateProductDto = z.infer<typeof CreateProductSchema>;

export const ProductListSchema = z.array(ProductSchema);

export const UpdateProductShema = CreateProductSchema.partial();
export type UpdateProductDto = z.infer<typeof UpdateProductShema>;

export const QueryParamsSchema = z.object({
  categoryId: z
    .coerce.number()
    .optional()
    .openapi({
      param: {
        name: 'categoryId',
        in: 'query'
      },
      example: 1,
    }),
});
export type QueryParamsDto = z.infer<typeof QueryParamsSchema>;
