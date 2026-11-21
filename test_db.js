import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';
dotenv.config({ path: 'C:\\Users\\malco\\OneDrive\\Desktop\\C430\\week 2\\.env.local' });
const sql = neon(process.env.DATABASE_URL);
async function test() {
  const res = await sql`SELECT version()`;
  console.log('Connected successfully:', res);
}
test().catch(console.error);