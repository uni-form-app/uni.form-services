import * as schema from './schema';
import "dotenv/config";

export const config = schema.env.parse({
  DATABASE_URL: process.env.DATABASE_URL,
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
})

export const rabbitMQ = schema.rabbitMQ.parse({
  URI: process.env.RABBIT_URI,
  TOPICS: {
    ORDER_CREATED: process.env.ORDER_CREATED,
  }
})