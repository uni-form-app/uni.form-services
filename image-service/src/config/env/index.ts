import * as schema from './schema';
import "dotenv/config";

export const rabbitMQ = schema.rabbitMQ.parse({
  URI: process.env.RABBIT_URI,
  TOPICS: {
    RABBIT_IMAGE_PROCESS: process.env.RABBIT_IMAGE_PROCESS,
  }
})

export const mongodb = schema.mongoDB.parse({
  URI: process.env.MONGODB_URI,
})

export const openAPI = schema.openAPI.parse({
  KEY: process.env.OPENAI_API_KEY,
})

export const config = {
  rabbitMQ,
  mongodb,
  openAPI,
}
