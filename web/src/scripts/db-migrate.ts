import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import { env } from 'process';

// create the connection
const connection = postgres({
    host: env.DB_HOST,
    database: env.DB_NAME,
    port: Number(env.DB_PORT),
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    max: 1,
});

const db = drizzle(connection);
console.log('migration started...');
await migrate(db, { migrationsFolder: 'drizzle' });
console.log('migration ended');
