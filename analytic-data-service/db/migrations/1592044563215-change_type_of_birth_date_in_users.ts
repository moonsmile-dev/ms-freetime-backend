import { Migration } from "https://deno.land/x/nessie/mod.ts";
import { Schema } from "https://deno.land/x/nessie/qb.ts";
import Dex from "https://deno.land/x/dex/mod.ts";

/** Runs on migrate */
export const up: Migration<Schema> = ({ queryBuilder }) => {
  queryBuilder.queryString("alter table users modify column birth_date bigint");

  return queryBuilder.query;
};

/** Runs on rollback */
export const down: Migration<Schema> = ({ queryBuilder }) => {
  queryBuilder.queryString(
    "alter table users modify column birth_date datetime",
  );
  return queryBuilder.query;
};
