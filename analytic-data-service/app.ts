import timer from "./middleware/timer.ts";
import logger from "./middleware/logger.ts";
import error from "./middleware/error.ts";
import { success } from "./common/responses.ts";
import { initOrm } from "./modules/core/orm.config.ts";
import { sync_recs_user_from_tinder_api_job } from "./modules/tinders/jobs/sync_recs_user_from_tinder_api_job.ts";
import { sync_mediafile_to_system_job } from "./modules/tinders/jobs/sync_mediafile_to_system_job.ts";

import { Application, Router, oakCors } from "./deps.ts";
import tinderRouter from "./modules/tinders/routes.ts";
import { IJobHandler, JobHandler } from "./common/jobHandler.ts";
import clearUserDataJob from "./modules/tinders/jobs/clearUserDataJob.ts";
import syncReactingUserJob from "./modules/tinders/jobs/syncReactingUserJob.ts";

const runBackgroundJob = async () => {
  const jobHandler: IJobHandler = new JobHandler();
  jobHandler.run(sync_mediafile_to_system_job);
  jobHandler.run(sync_recs_user_from_tinder_api_job);
  jobHandler.run(clearUserDataJob);
  jobHandler.run(syncReactingUserJob);
  // await sync_recs_user_from_tinder_api_job();
  // await sync_mediafile_to_system_job();
};

const runRouters = (app: Application) => {
  app.use(tinderRouter.routes());
};

const settingCors = (app: Application) => {
  app.use(
    oakCors({
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      preflightContinue: false,
      optionsSuccessStatus: 204,
    }),
  );
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
  // run routers
  runRouters(app);
  // cors
  settingCors(app);

  // init database
  await initOrm();
  // run background job
  await runBackgroundJob();

  console.log("app running -> http://localhost:3000");
  await app.listen({ port: 3000 });
};

await main();
