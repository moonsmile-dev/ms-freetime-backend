import { Migration, Schema } from "../../deps.ts";

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
