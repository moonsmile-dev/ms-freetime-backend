export const AUTH_TOKEN = "524c8434-e4a1-49a7-9cf4-6cbaa3c20057";

export const DB_HOSTNAME: string = Deno.env.get("ANALYTIC_DB_HOST") ?? "";
export const DB_PORT: number = Number(Deno.env.get("ANALYTIC_DB_PORT")) ?? -1;
export const DB_USERNAME: string = Deno.env.get("ANALYTIC_DB_USER") ?? "";
export const DB_PASSWORD: string = Deno.env.get("ANALYTIC_DB_PASSWORD") ?? "";
export const DB_NAME: string = Deno.env.get("ANALYTIC_DB_NAME") ?? "";

// TINDER API
export const TINDER_API = "https://api.gotinder.com";
export const USER_RECS_API = `${TINDER_API}/user/recs`;
export const USER_PASS_API = `${TINDER_API}/pass/{0}`; // hate user
export const USER_LIKE_API = `${TINDER_API}/like/{0}`;

// Media
export const MEDIA_FILE_DIR = "./mediafiles";
