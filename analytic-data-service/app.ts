import { Application, Router, Status } from "https://deno.land/x/oak/mod.ts";

import timer from "./middleware/timer.ts";
import logger from "./middleware/logger.ts";
import error from "./middleware/error.ts";
import { success } from "./common/responses.ts";
import { initOrm } from "./modules/core/orm.config.ts";

const app = new Application();
const router = new Router();

// middleware
app.use(logger);
app.use(timer);
app.use(error);

// init database
await initOrm();

router.get("/", (ctx) => {
  return success(ctx, null);
});

app.use(router.routes());

console.log("app running -> http://localhost:3000");
await app.listen({ port: 3000 });
