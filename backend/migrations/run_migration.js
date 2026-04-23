const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5432,
  database: 'kiddok_db',
  user: 'admin',
  password: 'admin_password',
});

async function run() {
  await client.connect();
  await client.query('ALTER TABLE "Child" ADD COLUMN IF NOT EXISTS "avatarSeed" TEXT;');
  console.log('Migration OK');
  await client.end();
}

run().catch(err => {
  console.error('Migration failed:', err.message);
  process.exit(1);
});