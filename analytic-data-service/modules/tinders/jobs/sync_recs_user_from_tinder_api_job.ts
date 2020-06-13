import {
  cron,
  daily,
  monthly,
  weekly,
  everyMinute,
  hourly,
} from "https://deno.land/x/deno_cron/cron.ts";
import sync_user_from_tinder_api_command from "../app/commands/sync_user_from_tinder_api_command.ts";

const sync_recs_user_from_tinder_api_job = async () => {
  await hourly(async () => {
    console.log(
      `Start running job: sync user from tinder api at ${new Date()}`,
    );
    await sync_user_from_tinder_api_command();
  });
};

export { sync_recs_user_from_tinder_api_job };
