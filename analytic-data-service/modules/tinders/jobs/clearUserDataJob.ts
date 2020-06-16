import { hourly } from "../../../deps.ts";
import { Bus } from "../../../common/bus.ts";
import ClearUserDataCommand from "../app/commands/clearUserDataCommand.ts";

const bus: Bus = new Bus();

const clearUserDataJob = async () => {
  await hourly(async () => {
    console.log(`Start running job: clear user data at ${new Date()}`);

    await bus.dispatch(new ClearUserDataCommand());
  });
};

export default clearUserDataJob;
