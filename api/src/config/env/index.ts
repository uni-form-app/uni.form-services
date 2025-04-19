import * as schema from './schema';
import "dotenv/config";

export const rabbitMQ = schema.rabbitMQ.parse({
  URI: process.env.RABBIT_URI,
  TOPICS: {
    RABBIT_PAYMENT_PROCESS: process.env.RABBIT_PAYMENT_PROCESS,
  }
})

export const env = schema.env.parse({
  DATABASE_URL: process.env.DATABASE_URL,
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
})

export const config = {
  rabbitMQ,
  env,
}
