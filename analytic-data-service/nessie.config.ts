import {
  DB_HOSTNAME,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
} from "./common/contants.ts";
import { ClientMySQL } from "https://deno.land/x/nessie@v1.0.0/mod.ts";

/** These are the default config options. */
const clientOptions = {
  migrationFolder: "./db/migrations",
  seedFolder: "./db/seeds",
};

/** Select one of the supported clients */
// const clientPg = new ClientPostgreSQL(clientOptions, {
//   database: "nessie",
//   hostname: "localhost",
//   port: 5432,
//   user: "root",
//   password: "pwd",
// });
const clientMySql = new ClientMySQL(clientOptions, {
  hostname: DB_HOSTNAME,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD, // uncomment this line for <8
  db: DB_NAME,
});
// const clientSqLite = new ClientSQLite(clientOptions, "./sqlite.db");

/** This is the final config object */
const config = {
  client: clientMySql,
  // Defaults to false, if you want the query builder exposed in migration files, set this to true.
  exposeQueryBuilder: true,
};

export default config;
