import { AUTH_TOKEN, USER_RECS_API } from "../../../common/contants.ts";

const getUserRecs = async () => {
  console.log(`Start requesting to api: ${USER_RECS_API}`);

  const recs_response = await fetch(USER_RECS_API, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Token": AUTH_TOKEN,
    },
  });
  const response_data = await recs_response.json();
  if (response_data["status"] == 200) {
    return response_data["results"];
  }

  let error_message: string = response_data["error"] ?? "";

  throw Error(
    `Can't connect to Dating API: ${USER_RECS_API} due to ${JSON.stringify(
      response_data
    )}`
  );
};

export default getUserRecs;
