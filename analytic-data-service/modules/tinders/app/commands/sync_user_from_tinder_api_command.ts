import get_user_recs from "../../services/get_user_recs.ts";

import { getStringOrDefault } from "../../../../common/strings.ts";
import {
  GENDER_MALE,
  GENDER_FEMALE,
  USER_STATUS_DRAFT,
  PHOTO_STATUS_NORMAL,
} from "../../domain/contants.ts";
import { Where, dso } from "../../../../deps.ts";
import {
  IUserRepository,
  UserRepository,
} from "../../domain/repositories/userRepository.ts";
import {
  IPhotoRepository,
  PhotoRepository,
} from "../../domain/repositories/photoRepository.ts";

const sync_user_from_tinder_api_command = async (
  userRepos: IUserRepository = new UserRepository(),
  photoRepos: IPhotoRepository = new PhotoRepository()
) => {
  const user_recs_data = await get_user_recs();
  let updatedUserCounter: number = 0;
  let addedUserCounter: number = 0;

  const totalSyncedUser: number = user_recs_data.length;

  const finisedLogging = (updated: number, added: number) => {
    console.log(`${updated} users are updated and ${added} users are added.`);
  };

  await dso.transaction(async (trans) => {
    user_recs_data.forEach(async (user_data: any) => {
      try {
        const refId: string = user_data["_id"];
        const gender: number = Number(user_data["gender"] ?? 0);
        const existedUser = await userRepos.findOne(
          Where.from({ ref_id: refId })
        );

        if (existedUser && gender === GENDER_FEMALE) {
          user_data["photos"].forEach(async (photoData: any) => {
            const existedPhoto = await photoRepos.findByUserIdAndRefId(
              String(existedUser.id),
              photoData["id"].slice(0, 8)
            );

            if (existedPhoto) {
              existedPhoto.url = photoData["url"];
              existedPhoto.metadata = JSON.stringify({
                photoProfiles: photoData["processedFiles"],
              });

              existedPhoto.url = photoData["url"];
              existedPhoto.metadata = JSON.stringify({
                photoProfiles: photoData["processedFiles"],
              });

              photoRepos.update(existedPhoto);
            } else {
              const refId: string = String(photoData["id"]).slice(0, 8);

              if (refId !== "unknown" && isValidedUrl(photoData["url"])) {
                photoRepos.insert({
                  refId: refId,
                  url: photoData["url"],
                  user_id: BigInt(existedUser.id),
                  status: PHOTO_STATUS_NORMAL,
                  metadata: JSON.stringify({
                    photoProfiles: photoData["processedFiles"],
                  }),
                });
              }
            }
          });

          updatedUserCounter++;
          if (updatedUserCounter + addedUserCounter === totalSyncedUser) {
            finisedLogging(updatedUserCounter, addedUserCounter);
          }
        } else {
          const user_id = await userRepos.insert({
            refId: user_data["_id"],
            name: user_data["name"],
            bio: getStringOrDefault(user_data, "bio", "").slice(0, 200),
            distance_mi: user_data["distance_mi"],
            birth_date: BigInt(
              Date.parse(user_data["birth_date"] ?? Date.now().toString()) ??
                Date.now()
            ),
            status: USER_STATUS_DRAFT,
          });

          user_data["photos"].forEach(async (photo_data: any) => {
            const refId: string = String(photo_data["id"]).slice(0, 8);

            if (refId !== "unknown" && isValidedUrl(photo_data["url"])) {
              photoRepos.insert({
                refId: refId,
                url: photo_data["url"],
                user_id: BigInt(user_id),
                status: PHOTO_STATUS_NORMAL,
                metadata: JSON.stringify({
                  photoProfiles: photo_data["processedFiles"],
                }),
              });
            }
          });

          addedUserCounter++;
          if (addedUserCounter + updatedUserCounter === totalSyncedUser) {
            finisedLogging(updatedUserCounter, addedUserCounter);
          }
        }
      } catch (error) {
        console.error(error);
      }
    });
  });
};

const isValidedUrl = async (url: string | undefined): Promise<boolean> => {
  try {
    const res = await fetch(url ?? "");

    if (res.status === 200) {
      return true;
    }
  } catch (error) {
    console.log(`Can't request to url: ${url}.`);
  }

  return false;
};

export default sync_user_from_tinder_api_command;
