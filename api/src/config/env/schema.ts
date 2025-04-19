import { z } from 'zod';

const rabbitTopcs = z.object({
  ORDER_CREATED: z.string().default('order.created'),
})

const rabbitMQ = z.object({
  URI: z.string().url(),
  TOPICS: rabbitTopcs,
})

const env = z.object({
  DATABASE_URL: z.string().url(),
  PORT: z.coerce.number().default(3000),
  JWT_SECRET: z.string().min(1),
  JWT_EXPIRES_IN: z.string().default('1h'),
})

export {
  rabbitTopcs,
  rabbitMQ,
  env,
}