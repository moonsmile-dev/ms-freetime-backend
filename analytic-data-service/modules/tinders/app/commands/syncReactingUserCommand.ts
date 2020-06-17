import { Command, CommandHandler } from "../../../../common/bus.ts";
import { IUserService, UserService } from "../../services/userService.ts";
import photo_repo from "../../domain/repositories/photo_repo.ts";
import { Where } from "../../../../deps.ts";
import {
  PHOTO_STATUS_LIKE,
  USER_STATUS_DRAFT,
  USER_STATUS_SYNCED,
  PHOTO_STATUS_HATE,
} from "../../domain/contants.ts";
import user_repo from "../../domain/repositories/user_repo.ts";

class SyncReactingUserCommand extends Command {
  handler = () => SyncReactingUserCommandHandler;
}

class SyncReactingUserCommandHandler extends CommandHandler {
  userService: IUserService;
  constructor(userService: IUserService = new UserService()) {
    super();

    this.userService = userService;
  }
  handle = async (command: SyncReactingUserCommand) => {
    const reactedPhotos = await photo_repo.findAll(
      Where.expr(
        `status = ${PHOTO_STATUS_LIKE} or status = ${PHOTO_STATUS_HATE}`,
      ),
    );
    reactedPhotos.forEach(async (photo) => {
      const partner = await user_repo.findOne(
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
          await user_repo.update(partner!);
        }
      }
    });
  };
}

export default SyncReactingUserCommand;
