import * as schema from './schema';
import "dotenv/config";

export const config = schema.env.parse({
  DATABASE_URL: process.env.DATABASE_URL,
  PORT: process.env.PORT,
})