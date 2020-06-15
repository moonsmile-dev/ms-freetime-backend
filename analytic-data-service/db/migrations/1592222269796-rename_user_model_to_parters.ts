import { Migration, Schema } from "../../deps.ts";

/** Runs on migrate */
export const up: Migration<Schema> = ({ queryBuilder }) => {
  // return new Schema()
  // return Dex
  queryBuilder.queryString(
    "alter table users rename partners;",
  );
  return queryBuilder.query;
};

/** Runs on rollback */
export const down: Migration<Schema> = ({ queryBuilder }) => {
  queryBuilder.queryString("alter table partners rename users;");

  return queryBuilder.query;
};
