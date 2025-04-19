import { z } from 'zod';

export const create = z.object({
  body: z.object({
    productId: z.string().uuid(),
    partnerId: z.string().uuid(),
  }),
})