import { Migration } from "https://deno.land/x/nessie@v1.0.4/mod.ts";
import { Schema } from "https://deno.land/x/nessie@v1.0.4/qb.ts";

/** Runs on migrate */
export const up: Migration<Schema> = ({ queryBuilder }) => {
  queryBuilder.create("locations", (table) => {
    table.id();
    table.string("latitude", 20).notNullable();
    table.string("longitude", 20).notNullable();
    table.string("name", 50).nullable();
    table.bigInteger("user_id").notNullable();
  });

  queryBuilder.queryString(
    "alter table locations add foreign key (user_id) references partners(id);"
  );

  return queryBuilder.query;
};

/** Runs on rollback */
export const down: Migration<Schema> = ({ queryBuilder }) => {
  return queryBuilder.drop("locations");
};
