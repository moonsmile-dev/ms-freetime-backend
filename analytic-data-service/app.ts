import timer from "./middleware/timer.ts";
import logger from "./middleware/logger.ts";
import error from "./middleware/error.ts";
import { initOrm } from "./modules/core/orm.config.ts";
import { syncRecsUserFromDatingApiJob } from "./modules/datings/jobs/syncRecsUserFromDatingApiJob.ts";
import { sync_mediafile_to_system_job } from "./modules/datings/jobs/sync_mediafile_to_system_job.ts";

import { Application, Router, oakCors } from "./deps.ts";
import datingRouter from "./modules/datings/routes.ts";
import { IJobHandler, JobHandler } from "./common/jobHandler.ts";
import clearUserDataJob from "./modules/datings/jobs/clearUserDataJob.ts";
import syncReactingUserJob from "./modules/datings/jobs/syncReactingUserJob.ts";
import changeUserLocationJob from "./modules/datings/jobs/changeUserLocationJob.ts";
import { Bus } from "./common/bus.ts";
import ChangeUserLocationCommand from "./modules/datings/app/commands/changeUserLocationCommand.ts";

const runBackgroundJob = async () => {
  const jobHandler: IJobHandler = new JobHandler();
  // jobHandler.run(changeUserLocationJob);
  // jobHandler.run(sync_mediafile_to_system_job);
  // jobHandler.run(clearUserDataJob);
  jobHandler.run(syncReactingUserJob);
  jobHandler.run(syncRecsUserFromDatingApiJob);
  // await syncRecsUserFromDatingApiJob();
  // await sync_mediafile_to_system_job();
};

const runRouters = (app: Application) => {
  app.use(datingRouter.routes());
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
