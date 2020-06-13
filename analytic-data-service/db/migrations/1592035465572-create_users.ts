import { Migration } from "https://deno.land/x/nessie/mod.ts";
import { Schema } from "https://deno.land/x/nessie/qb.ts";
import Dex from "https://deno.land/x/dex/mod.ts";

export const up: Migration<Schema> = ({ queryBuilder }) => {
  queryBuilder.create("users", (table) => {
    table.id();
    table.string("name", 50).nullable();
    table.string("bio", 200).nullable();
    table.string("ref_id", 30).notNullable();
    table.integer("distance_mi").default(0);
    table.dateTime("birth_date");
    table.createdAt();
    table.updatedAt();
  });

  return queryBuilder.query;
};

/** Runs on rollback */
export const down: Migration<Schema> = ({ queryBuilder }) => {
  return queryBuilder.drop("users");
};
