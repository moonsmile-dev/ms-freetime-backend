import { Migration } from "https://deno.land/x/nessie@v1.0.4/mod.ts";
import { Schema } from "https://deno.land/x/nessie@v1.0.4/qb.ts";

/** Runs on migrate */
export const up: Migration<Schema> = ({ queryBuilder }) => {
  // return new Schema()
  // return Dex
  queryBuilder.queryString(
    "alter table photos change column is_favorited status integer;"
  );
  return queryBuilder.query;
};

/** Runs on rollback */
export const down: Migration<Schema> = ({ queryBuilder }) => {
  queryBuilder.queryString(
    "alter table photos change column status is_favorited integer;"
  );

  return queryBuilder.query;
};
