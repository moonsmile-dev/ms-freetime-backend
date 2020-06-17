import get_user_recs from "../../services/get_user_recs.ts";
import user_repo from "../../domain/repositories/user_repo.ts";

import photo_repo from "../../domain/repositories/photo_repo.ts";
import { getStringOrDefault } from "../../../../common/strings.ts";
import {
  GENDER_MALE,
  GENDER_FEMALE,
  USER_STATUS_DRAFT,
} from "../../domain/contants.ts";
import { Where, dso } from "../../../../deps.ts";

const sync_user_from_tinder_api_command = async () => {
  const user_recs_data = await get_user_recs();
  const transaction = dso.transaction(async (trans) => {
    user_recs_data.forEach(async (user_data: any) => {
      try {
        const refId: string = user_data["_id"];
        const gender: number = Number(user_data["gender"] ?? 0);
        const existedUser = await user_repo.findOne(
          Where.from({ ref_id: refId }),
        );

        if (existedUser && gender === GENDER_FEMALE) {
          // TODO sync data
        } else {
          const user_id = await user_repo.insert({
            refId: user_data["_id"],
            name: user_data["name"],
            bio: getStringOrDefault(user_data, "bio", "").slice(0, 200),
            distance_mi: user_data["distance_mi"],
            birth_date: BigInt(
              Date.parse(user_data["birth_date"] ?? Date.now().toString()) ??
                Date.now(),
            ),
            status: USER_STATUS_DRAFT,
          });

          user_data["photos"].forEach(async (photo_data: any) => {
            const refId: string = String(photo_data["id"]).slice(0, 8);
            if (refId !== "unknown") {
              await photo_repo.insert({
                refId: refId,
                url: photo_data["url"],
                user_id: BigInt(user_id),
              });
            }
          });
        }
      } catch (error) {
        console.error(error);
      }
    });
  });

  return await transaction;
};

export default sync_user_from_tinder_api_command;
