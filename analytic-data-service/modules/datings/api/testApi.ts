import { Bus } from "../../../common/bus.ts";
import ClearUserDataCommand from "../app/commands/clearUserDataCommand.ts";
import { success } from "../../../common/responses.ts";

import ChangeUserLocationCommand from "../app/commands/changeUserLocationCommand.ts";
import sync_medifile_to_system_command from "../app/commands/sync_mediafile_to_system_command.ts";
import syncUserFromDatingApiCommand from "../app/commands/syncUserFromDatingApiCommand.ts";

const bus: Bus = new Bus();

const testNewCommandAPI = async (ctx: any) => {
  console.log(`Starting clear user data.`);
  // await bus.dispatch(new ChangeUserLocationCommand());
  // await sync_medifile_to_system_command();
  syncUserFromDatingApiCommand();

  return success(ctx, null);
};

export default testNewCommandAPI;
