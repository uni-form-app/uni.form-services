import { OrderStatus } from '@prisma/client';
import { z } from 'zod';

export const create = z.object({
  body: z.object({
    productId: z.string().uuid(),
    partnerId: z.string().uuid(),
  }),
})

export const pay = z.object({
  params: z.object({
    orderId: z.string().uuid(),
  })
})

export const get = z.object({
  query: z.object({
    status: z.union([
      z.nativeEnum(OrderStatus),
      z.array(z.nativeEnum(OrderStatus))
    ])
  })
})