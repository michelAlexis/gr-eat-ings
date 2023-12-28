import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/lib/server/schema.ts',
  out: './drizzle',
  driver: 'mysql2', 
  dbCredentials: {
    uri: process.env.DB_URL,
    url: process.env.DB_URL,
    authToken: process.env.DB_TOKEN,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
}); 
