import { Application, Router, Status } from "https://deno.land/x/oak/mod.ts";

import timer from "./middleware/timer.ts";
import logger from "./middleware/logger.ts";
import error from "./middleware/error.ts";
import { success } from "./common/responses.ts";

const app = new Application();
const router = new Router();

app.use(logger);
app.use(timer);
app.use(error);

router.get("/", (ctx) => {
  return success(ctx, null);
});

app.use(router.routes());

console.log("app running -> http://localhost:3000");
await app.listen({ port: 3000 });
