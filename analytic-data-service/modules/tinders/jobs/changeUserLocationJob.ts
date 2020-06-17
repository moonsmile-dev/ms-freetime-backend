import { Bus } from "../../../common/bus.ts";
import { daily } from "../../../deps.ts";
import ChangeUserLocationCommand from "../app/commands/changeUserLocationCommand.ts";

const bus: Bus = new Bus();

const changeUserLocationJob = async () => {
  await daily(async () => {
    console.log(`Start running job: change user location at ${new Date()}`);

    await bus.dispatch(new ChangeUserLocationCommand());
  });
};

export default changeUserLocationJob;
