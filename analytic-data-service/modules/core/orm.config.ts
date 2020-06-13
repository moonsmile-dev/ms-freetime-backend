import { dso } from "https://deno.land/x/dso@v1.0.0/mod.ts";
import {
  DB_HOSTNAME,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
} from "../../common/contants.ts";

export const initOrm = async () => {
  dso.connect({
    hostname: DB_HOSTNAME,
    port: DB_PORT,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    db: DB_NAME,
  });

  await dso.sync(false);
};
