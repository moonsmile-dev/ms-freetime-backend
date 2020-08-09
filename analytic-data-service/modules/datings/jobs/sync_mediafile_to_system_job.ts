import sync_mediafile_to_system_command from "../app/commands/sync_mediafile_to_system_command.ts";
import { hourly } from "../../../deps.ts";

const sync_mediafile_to_system_job = async () => {
  await hourly(async () => {
    console.log(`Start running job: sync mediafile to system at ${new Date()}`);

    await sync_mediafile_to_system_command();
  });
};

export { sync_mediafile_to_system_job };
