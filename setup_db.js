import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';
dotenv.config({ path: 'C:\\Users\\malco\\OneDrive\\Desktop\\C430\\week 2\\.env.local' });
const sql = neon(process.env.DATABASE_URL);

async function setup() {
  await sql`
    CREATE TABLE IF NOT EXISTS meetings (
      id             SERIAL        PRIMARY KEY,
      date           DATE          NOT NULL UNIQUE,
      meeting_type   VARCHAR(20)   NOT NULL,
      presiding      VARCHAR(255)  NOT NULL,
      conducting     VARCHAR(255)  NOT NULL,
      announcements  TEXT[]        DEFAULT '{}',
      opening_hymn   JSONB         NOT NULL,
      opening_prayer VARCHAR(255)  NOT NULL,
      ward_business  JSONB         DEFAULT '[]',
      stake_business BOOLEAN       DEFAULT false,
      sacrament_hymn JSONB         NOT NULL,
      speakers       JSONB         DEFAULT '[]',
      closing_hymn   JSONB         NOT NULL,
      closing_prayer VARCHAR(255)  NOT NULL
    );
  `;
  console.log('Table created successfully!');
}
setup().catch(console.error);