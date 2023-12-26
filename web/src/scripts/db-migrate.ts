import { drizzle } from 'drizzle-orm/planetscale-serverless';
import { connect } from '@planetscale/database';
import { env } from 'process';
import { migrate } from 'drizzle-orm/planetscale-serverless/migrator';

// create the connection
const connection = connect({
    host: env.DB_HOST,
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
});

const db = drizzle(connection);
console.log('migration started...');
await migrate(db, { migrationsFolder: 'drizzle' });
console.log('migration ended');
