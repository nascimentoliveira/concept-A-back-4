"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const pg_1 = __importDefault(require("pg"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { Pool } = pg_1.default;
const configDatabase = {
    connectionString: process.env.DATABASE_URL,
    ssl: false,
};
if (process.env.MODE === "prod") {
    configDatabase.ssl = { rejectUnauthorized: false };
}
exports.db = new Pool(configDatabase);
