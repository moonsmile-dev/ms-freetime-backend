import { Command, CommandHandler } from "../../../../common/bus.ts";
import { IUserService, UserService } from "../../services/userService.ts";
import { Where } from "../../../../deps.ts";
import {
  PHOTO_STATUS_LIKE,
  USER_STATUS_DRAFT,
  USER_STATUS_SYNCED,
  PHOTO_STATUS_HATE,
} from "../../domain/contants.ts";
import {
  IUserRepository,
  UserRepository,
} from "../../domain/repositories/userRepository.ts";
import {
  IPhotoRepository,
  PhotoRepository,
} from "../../domain/repositories/photoRepository.ts";
import PhotoModel from "../../domain/models/photo_model.ts";

class SyncReactingUserCommand extends Command {
  handler = () => SyncReactingUserCommandHandler;
}

class SyncReactingUserCommandHandler extends CommandHandler {
  userService: IUserService;
  userRepos: IUserRepository;
  photoRepos: IPhotoRepository;
  constructor(
    userService: IUserService = new UserService(),
    userRepos: IUserRepository = new UserRepository(),
    photoRepos: IPhotoRepository = new PhotoRepository(),
  ) {
    super();
    this.userRepos = userRepos;
    this.userService = userService;
    this.photoRepos = photoRepos;
  }
  handle = async (command: SyncReactingUserCommand) => {
    const reactedPhotos = await this.photoRepos.findAll(
      Where.expr(
        `status = ${PHOTO_STATUS_LIKE} or status = ${PHOTO_STATUS_HATE}`,
      ),
    );
    reactedPhotos.forEach(async (photo: PhotoModel) => {
      const partner = await this.userRepos.findOne(
        Where.expr(`id = ${photo.user_id} and status = ${USER_STATUS_DRAFT}`),
      );

      if (partner !== undefined) {
        let status = false;
        if (photo.status === PHOTO_STATUS_LIKE) {
          status = await this.userService.loveUserAction(
            String(partner!.refId),
          );
        } else {
          status = await this.userService.hateUserAction(
            String(partner!.refId),
          );
        }
        if (status === true) {
          partner!.status = USER_STATUS_SYNCED;
          await this.userRepos.update(partner!);
        }
      }
    });
  };
}

export default SyncReactingUserCommand;
