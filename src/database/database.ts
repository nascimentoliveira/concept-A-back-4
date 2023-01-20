import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pg;

const configDatabase: pg.PoolConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: false,
};

if (process.env.MODE === "prod") {
  configDatabase.ssl = true;
}

export function connectDb(): pg.Pool {
  const db: pg.Pool = new Pool(configDatabase);
  return db;
}