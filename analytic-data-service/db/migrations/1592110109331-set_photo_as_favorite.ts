import { Migration } from "https://deno.land/x/nessie@v1.0.4/mod.ts";
import { Schema } from "https://deno.land/x/nessie@v1.0.4/qb.ts";

/** Runs on migrate */
export const up: Migration<Schema> = ({ queryBuilder }) => {
  // return new Schema()
  // return Dex
  queryBuilder.queryString(
    "alter table photos add column is_favorited integer default 0;"
  );
  return queryBuilder.query;
};

/** Runs on rollback */
export const down: Migration<Schema> = ({ queryBuilder }) => {
  queryBuilder.queryString("alter tables photos drop column is_favorited;");

  return queryBuilder.query;
};
