import { MEDIA_FILE_DIR } from "../../../../common/contants.ts";
import { ensureDir, Where } from "../../../../deps.ts";
import { PHOTO_STATUS_LIKE } from "../../domain/contants.ts";
import {
  IPhotoRepository,
  PhotoRepository,
} from "../../domain/repositories/photoRepository.ts";

const sync_medifile_to_system_command = async (
  photoRepos: IPhotoRepository = new PhotoRepository(),
) => {
  await ensureDir(MEDIA_FILE_DIR);

  const photos = await photoRepos.findAll(
    Where.expr(`is_synced = 0 and status = ${PHOTO_STATUS_LIKE}`),
  );

  console.log(
    `Syncing ${photos.length} photos to the system at ${new Date()}.`,
  );

  let photoCounter: number = 0;
  photos.forEach(async (synced_photo) => {
    await write_file_url_to_disk(synced_photo.url ?? "", MEDIA_FILE_DIR);

    synced_photo.is_synced = 1;
    await photoRepos.update(synced_photo);

    photoCounter++;
    if (photoCounter === photos.length) {
      console.log(
        `Synced ${photoCounter} photos to the system at ${new Date()}.`,
      );
    }
  });
};

const write_file_url_to_disk = async (file_url: string, file_path: string) => {
  try {
    const res = await fetch(
      file_url,
    );

    const contentType: Array<String> = (res.headers.get("content-type") ?? "")
      .split("/");

    if (contentType.length > 1 && contentType[0] === "image") {
      const imageBytes = new Uint8Array(await res.arrayBuffer());
      await Deno.writeFile(
        `${file_path}/synced_image_${Date.now()}.${contentType[1]}`,
        imageBytes,
      );
    }
  } catch (error) {
    console.log(`Can't write ${file_url} to the system`);
  }
};

export default sync_medifile_to_system_command;
