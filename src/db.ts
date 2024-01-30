import pg from "pg";

const pgConfig = {
  user: process.env.PG_USER || 'admin',
  password: process.env.PG_PASSWORD || 'password',
  host: process.env.PG_HOST || 'postgres',
  database: process.env.PG_DB || 'postgres',
  port: Number(process.env.PG_PORT || '5432'),
};

export const pool = new pg.Pool(pgConfig);
