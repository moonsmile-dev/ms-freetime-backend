import { Migration } from "https://deno.land/x/nessie@v1.0.4/mod.ts";
import { Schema } from "https://deno.land/x/nessie@v1.0.4/qb.ts";

/** Runs on migrate */
export const up: Migration<Schema> = ({ queryBuilder }) => {
  queryBuilder.queryString("alter table users modify column birth_date bigint");

  return queryBuilder.query;
};

/** Runs on rollback */
export const down: Migration<Schema> = ({ queryBuilder }) => {
  queryBuilder.queryString(
    "alter table users modify column birth_date datetime"
  );
  return queryBuilder.query;
};
