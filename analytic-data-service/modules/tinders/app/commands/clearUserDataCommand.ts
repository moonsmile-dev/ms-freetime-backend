import { Command, CommandHandler } from "../../../../common/bus.ts";
import { Where } from "../../../../deps.ts";
import {
  PHOTO_STATUS_HATE,
  PHOTO_STATUS_NORMAL,
  USER_STATUS_DRAFT,
} from "../../domain/contants.ts";
import { IUserService, UserService } from "../../services/userService.ts";
import PhotoModel from "../../domain/models/photo_model.ts";
import {
  IPhotoRepository,
  PhotoRepository,
} from "../../domain/repositories/photoRepository.ts";

class ClearUserDataCommand extends Command {
  constructor() {
    super();
  }
  handler = () => ClearUserDataCommandHandler;
}

class ClearUserDataCommandHandler extends CommandHandler {
  userService: IUserService;
  photoRepos: IPhotoRepository;
  constructor(
    userService: IUserService = new UserService(),
    photoRepos: IPhotoRepository = new PhotoRepository(),
  ) {
    super();
    this.userService = userService;
    this.photoRepos = photoRepos;
  }
  handle = async (command: ClearUserDataCommand) => {
    // delete failed photo
    console.log(`Deleting failed photos at ${new Date()}`);
    const photos = await this.photoRepos.findAll(
      Where.expr(`status = ${PHOTO_STATUS_NORMAL}`),
    );
    photos.forEach(async (photo: PhotoModel) => {
      try {
        const res = await fetch(photo.url ?? "");

        if (
          res.status !== 200 ||
          new RegExp("image/*").test(
              res.headers.get("content-type") ?? "",
            ) !== true
        ) {
          await this.photoRepos.delete(Where.expr(`id = ${photo.id}`));
        }
      } catch (error) {
        await this.photoRepos.delete(Where.expr(`id = ${photo.id}`));
      }
    });
  };
}

export default ClearUserDataCommand;
