import { z } from 'zod';

export const create = z.object({
  body: z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    city: z.string().min(1, { message: 'City is required' }),
    address: z.string().min(1, { message: 'Address is required' }),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
  }),
})

export const update = z.object({
  body: z.object({
    id: z.string().uuid(),
    name: z.string().min(1, { message: 'Name is required' }),
    city: z.string().min(1, { message: 'City is required' }),
    address: z.string().min(1, { message: 'Address is required' }),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
  }),
  params: z.object({
    partnerId: z.string().uuid(),
  }),
})

export const exclude = z.object({
  params: z.object({
    partnerId: z.string().uuid(),
  }),
})