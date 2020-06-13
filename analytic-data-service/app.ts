import { Application, Router, Status } from "https://deno.land/x/oak/mod.ts";

import timer from "./middleware/timer.ts";
import logger from "./middleware/logger.ts";
import error from "./middleware/error.ts";
import { success } from "./common/responses.ts";
import { initOrm } from "./modules/core/orm.config.ts";
import { sync_recs_user_from_tinder_api_job } from "./modules/tinders/jobs/sync_recs_user_from_tinder_api_job.ts";

const runBackgroundJob = async () => {
  await sync_recs_user_from_tinder_api_job();
};

const runMiddleware = (app: Application) => {
  app.use(logger);
  app.use(timer);
  app.use(error);
};

const main = async () => {
  const app = new Application();
  const router = new Router();

  // middleware
  runMiddleware(app);

  // init database
  await initOrm();
  // run background job
  await runBackgroundJob();

  router.get("/", (ctx) => {
    return success(ctx, null);
  });

  app.use(router.routes());

  console.log("app running -> http://localhost:3000");
  await app.listen({ port: 3000 });
};

await main();
