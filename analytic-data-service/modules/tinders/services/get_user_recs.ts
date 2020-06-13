import { FB_TOKEN, USER_RECS_API } from "../../../common/contants.ts";
import user_repo from "../domain/repositories/user_repo.ts";

const get_user_rects = async () => {
  const recs_response = await fetch(USER_RECS_API, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Token": FB_TOKEN,
    },
  });
  const response_data = await recs_response.json();
  if (response_data["status"] == 200) {
    return response_data["results"];
  }

  throw Error(`Can't connect to Tinder API: ${USER_RECS_API}`);
};

export default get_user_rects;