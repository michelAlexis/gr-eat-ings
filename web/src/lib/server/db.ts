import { env } from '$env/dynamic/private';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// create the connection
const connection = postgres({
    host: env.DB_HOST,
    database: env.DB_NAME,
    port: Number(env.DB_PORT),
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    prepare: false,
});

export const db = drizzle(connection, { schema });
