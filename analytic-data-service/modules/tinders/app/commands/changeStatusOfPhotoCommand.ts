import { Command, CommandHandler } from "../../../../common/bus.ts";
import photo_repo from "../../domain/repositories/photo_repo.ts";
import { PHOTO_STATUS_HATE, PHOTO_STATUS_LIKE } from "../../domain/contants.ts";

class ChangeStatusOfPhotoCommand extends Command {
  status: number;
  photoId: number;
  constructor(photoId: number, status: number) {
    super();
    this.photoId = photoId;
    this.status = status;
  }
  handler = () => ChangeStatusOfPhotoCommandHandler;
}

class ChangeStatusOfPhotoCommandHandler extends CommandHandler {
  handle = async (command: ChangeStatusOfPhotoCommand) => {
    const photo = await photo_repo.findById(command.photoId);
    if (photo === null) {
      throw Error(`Can't find the photo with id: ${command.photoId}`);
    }

    if ([PHOTO_STATUS_HATE, PHOTO_STATUS_LIKE].includes(command.status)) {
      photo!.status = command.status;

      await photo_repo.update(photo!);
    } else {
      throw Error(`The status ${command.status} isn't existed.`);
    }
  };
}

export default ChangeStatusOfPhotoCommand;
