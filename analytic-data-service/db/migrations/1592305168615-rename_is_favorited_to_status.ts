import { Migration } from "https://deno.land/x/nessie/mod.ts";
import { Schema } from "https://deno.land/x/nessie/qb.ts";
import Dex from "https://deno.land/x/dex/mod.ts";

/** Runs on migrate */
export const up: Migration<Schema> = ({ queryBuilder }) => {
  // return new Schema()
  // return Dex
  queryBuilder.queryString(
    "alter table photos change column is_favorited status integer;",
  );
  return queryBuilder.query;
};

/** Runs on rollback */
export const down: Migration<Schema> = ({ queryBuilder }) => {
  queryBuilder.queryString(
    "alter table photos change column status is_favorited integer;",
  );

  return queryBuilder.query;
};
