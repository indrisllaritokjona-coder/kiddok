import psycopg2

conn = psycopg2.connect(
    host="localhost",
    port=5432,
    dbname="kiddok_db",
    user="admin",
    password="admin_password"
)
cur = conn.cursor()
cur.execute('ALTER TABLE "Child" ADD COLUMN IF NOT EXISTS "avatarSeed" TEXT;')
conn.commit()
print("OK")
cur.close()
conn.close()