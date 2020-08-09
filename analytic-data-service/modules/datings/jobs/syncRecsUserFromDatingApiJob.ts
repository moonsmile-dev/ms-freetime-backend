import syncUserFromDatingApiCommand from "../app/commands/syncUserFromDatingApiCommand.ts";
import { hourly, every15Minute, daily } from "../../../deps.ts";

const syncRecsUserFromDatingApiJob = async () => {
  await every15Minute(async () => {
    console.log(
      `Start running job: sync user from dating api at ${new Date()}`
    );
    await syncUserFromDatingApiCommand();
  });
};

export { syncRecsUserFromDatingApiJob };
