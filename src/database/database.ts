import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pg;

const configDatabase: pg.PoolConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: false,
};

if (process.env.MODE === "prod") {
  configDatabase.ssl = { rejectUnauthorized: false };
}

const db: pg.Pool = new Pool(configDatabase);

export default db;