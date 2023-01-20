import express, { Express } from "express";
import cors from "cors";
import { connectDb } from "./database/database.js";

const app = express();
app
  .use(cors())
  .use(express.json())
  .get("/health", (req, res) => res.send("OK!"));

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export default app;