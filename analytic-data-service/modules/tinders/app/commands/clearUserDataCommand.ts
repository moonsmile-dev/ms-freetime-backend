import { Command, CommandHandler } from "../../../../common/bus.ts";
import photo_repo from "../../domain/repositories/photo_repo.ts";
import { Where } from "../../../../deps.ts";
import user_repo from "../../domain/repositories/user_repo.ts";
import { PHOTO_STATUS_HATE } from "../../domain/contants.ts";
import { IUserService, UserService } from "../../services/userService.ts";

class ClearUserDataCommand extends Command {
  constructor() {
    super();
  }
  handler = () => ClearUserDataCommandHandler;
}

class ClearUserDataCommandHandler extends CommandHandler {
  userService: IUserService;
  constructor(userService: IUserService = new UserService()) {
    super();
    this.userService = userService;
  }
  handle = async (command: ClearUserDataCommand) => {
    // delete failed photo
    console.log(`Deleting failed photos at ${new Date()}`);
    const photos = await photo_repo.findAll(Where.expr("id is not null"));
    photos.forEach(async (photo) => {
      try {
        const res = await fetch(photo.url ?? "");

        if (
          res.status !== 200 ||
          new RegExp("image/*").test(
              res.headers.get("content-type") ?? "",
            ) !== true
        ) {
          await photo_repo.delete(Where.expr(`id = ${photo.id}`));
        }
      } catch (error) {
        await photo_repo.delete(Where.expr(`id = ${photo.id}`));
      }
    });

    // Delete user don't have image
    console.log(`Deleting users don't have any photos at ${new Date()}`);
    const partners = await user_repo.findAll(Where.expr("id is not null"));

    partners.forEach(async (partner) => {
      const photosOfUser = await photo_repo.findAll(
        Where.expr(`user_id = ${partner.id ?? 0}`),
      );

      if (photosOfUser.length === 0) {
        // raise hating this user
        if (partner.refId !== null) {
          await this.userService.hateUserAction(partner.refId ?? "");
        }
        await user_repo.delete(Where.expr(`id = ${partner.id ?? 0}`));
      }
    });
  };
}

export default ClearUserDataCommand;
