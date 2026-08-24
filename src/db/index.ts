import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

// In a real application, ensure process.env.DATABASE_URL is set in your .env file
const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql, { schema });
