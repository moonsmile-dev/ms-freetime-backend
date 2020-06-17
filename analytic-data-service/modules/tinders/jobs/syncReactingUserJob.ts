import { hourly } from "../../../deps.ts";
import { Bus } from "../../../common/bus.ts";
import SyncReactingUserCommand from "../app/commands/syncReactingUserCommand.ts";

const bus: Bus = new Bus();

const syncReactingUserJob = async () => {
  await hourly(async () => {
    console.log(
      `Start running job: sync reacting user job to Tinder system at ${new Date()}`,
    );

    await bus.dispatch(new SyncReactingUserCommand());
  });
};
export default syncReactingUserJob;
