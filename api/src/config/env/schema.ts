import { z } from 'zod';

const rabbitTopcs = z.object({
  RABBIT_PAYMENT_PROCESS: z.string().default('payment.process'),
  RABBIT_IMAGE_PROCESS: z.string().default('image.process'),
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