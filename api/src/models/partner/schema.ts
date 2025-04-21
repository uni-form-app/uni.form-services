import { z } from 'zod';

export const create = z.object({
  body: z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    city: z.string().min(1, { message: 'City is required' }),
    address: z.string().min(1, { message: 'Address is required' }),
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180),
  }),
})

export const update = z.object({
  body: create.shape.body.partial(),
  params: z.object({
    partnerId: z.string().uuid(),
  }),
})

export const exclude = z.object({
  params: z.object({
    partnerId: z.string().uuid(),
  }),
})

export const get = z.object({
  query: z.object({
    lat: z.coerce.number().optional(),
    lng: z.coerce.number().optional(),
    radius: z.coerce.number().optional(),
    search: z.string().optional(),
  }),
});