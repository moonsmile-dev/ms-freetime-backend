export const FB_TOKEN = "c3c7c3d5-17c3-45bd-b647-950bb8d0b517";

export const DB_HOSTNAME: string = Deno.env.get("ANALYTIC_DB_HOST") ?? "";
export const DB_PORT: number = Number(Deno.env.get("ANALYTIC_DB_PORT")) ?? -1;
export const DB_USERNAME: string = Deno.env.get("ANALYTIC_DB_USER") ?? "";
export const DB_PASSWORD: string = Deno.env.get("ANALYTIC_DB_PASSWORD") ?? "";
export const DB_NAME: string = Deno.env.get("ANALYTIC_DB_NAME") ?? "";

// TINDER API
export const USER_RECS_API = "https://api.gotinder.com/user/recs";
