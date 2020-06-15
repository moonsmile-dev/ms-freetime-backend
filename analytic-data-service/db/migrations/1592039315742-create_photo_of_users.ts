import { Migration, Schema } from "../../deps.ts";

/** Runs on migrate */
export const up: Migration<Schema> = ({ queryBuilder }) => {
  // return new Schema()
  // return Dex
  queryBuilder.create("photos", (table) => {
    table.id();
    table.string("ref_id", 20).notNullable();
    table.string("url", 500).notNullable();
    table.bigInteger("user_id").notNullable();
  });

  queryBuilder.queryString(
    "alter table photos add foreign key (user_id) references users(id);",
  );

  return queryBuilder.query;
};

/** Runs on rollback */
export const down: Migration<Schema> = ({ queryBuilder }) => {
  return queryBuilder.drop("photos");
};
