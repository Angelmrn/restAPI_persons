import pg from "pg";

export const pool = new pg.Pool({
  user: "postgres",
  host: "localhost",
  database: "personas_test",
  password: "****",
  port: 5432,
});
