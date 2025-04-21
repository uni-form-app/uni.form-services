import { z } from 'zod';

const rabbitTopcs = z.object({
  RABBIT_IMAGE_PROCESS: z.string().default('image.process'),
})

const rabbitMQ = z.object({
  URI: z.string().url(),
  TOPICS: rabbitTopcs,
})

const mongoDB = z.object({
  URI: z.string().url(),
})

const openAPI = z.object({
  KEY: z.string(),
})

export {
  rabbitTopcs,
  rabbitMQ,
  mongoDB,
  openAPI,
}