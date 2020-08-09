import timer from "./middleware/timer.ts";
import logger from "./middleware/logger.ts";
import error from "./middleware/error.ts";
import { initOrm } from "./modules/core/orm.config.ts";
import { sync_recs_user_from_tinder_api_job } from "./modules/tinders/jobs/sync_recs_user_from_tinder_api_job.ts";
import { sync_mediafile_to_system_job } from "./modules/tinders/jobs/sync_mediafile_to_system_job.ts";

import { Application, Router, oakCors } from "./deps.ts";
import tinderRouter from "./modules/tinders/routes.ts";
import { IJobHandler, JobHandler } from "./common/jobHandler.ts";
import clearUserDataJob from "./modules/tinders/jobs/clearUserDataJob.ts";
import syncReactingUserJob from "./modules/tinders/jobs/syncReactingUserJob.ts";
import changeUserLocationJob from "./modules/tinders/jobs/changeUserLocationJob.ts";
import { Bus } from "./common/bus.ts";
import ChangeUserLocationCommand from "./modules/tinders/app/commands/changeUserLocationCommand.ts";

const runBackgroundJob = async () => {
  const jobHandler: IJobHandler = new JobHandler();
  // jobHandler.run(changeUserLocationJob);
  // jobHandler.run(sync_mediafile_to_system_job);
  // jobHandler.run(clearUserDataJob);
  jobHandler.run(syncReactingUserJob);
  jobHandler.run(sync_recs_user_from_tinder_api_job);
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
    })
  );
};

const runMiddleware = (app: Application) => {
  app.use(logger);
  app.use(timer);
  app.use(error);
};

const onStartUp = async () => {
  const bus: Bus = new Bus();

  // change user location
  // await bus.dispatch(new ChangeUserLocationCommand());
};

const main = async () => {
  const app = new Application();

  // middleware
  runMiddleware(app);
  // cors
  settingCors(app);
  // run routers
  runRouters(app);

  // init database
  await initOrm();

  // on start up
  await onStartUp();

  // run background job
  await runBackgroundJob();

  console.log("app running -> http://localhost:3000");
  await app.listen({ port: 3000 });
};

await main();
