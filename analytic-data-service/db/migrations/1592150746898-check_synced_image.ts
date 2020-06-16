import { Migration } from "https://deno.land/x/nessie/mod.ts";
import { Schema } from "https://deno.land/x/nessie/qb.ts";
import Dex from "https://deno.land/x/dex/mod.ts";

/** Runs on migrate */
export const up: Migration<Schema> = ({ queryBuilder }) => {
  // return new Schema()
  // return Dex
  queryBuilder.queryString(
    "alter table photos add column is_synced integer default 0;",
  );
  return queryBuilder.query;
};

/** Runs on rollback */
export const down: Migration<Schema> = ({ queryBuilder }) => {
  queryBuilder.queryString("alter tables photos drop column is_synced;");

  return queryBuilder.query;
};
