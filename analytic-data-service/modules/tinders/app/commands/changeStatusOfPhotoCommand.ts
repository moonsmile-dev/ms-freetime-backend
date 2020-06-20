import { Command, CommandHandler } from "../../../../common/bus.ts";
import {
  PHOTO_STATUS_HATE,
  PHOTO_STATUS_LIKE,
  PHOTO_STATUS_HIDE,
} from "../../domain/contants.ts";
import {
  IPhotoRepository,
  PhotoRepository,
} from "../../domain/repositories/photoRepository.ts";

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
  photoRepos: IPhotoRepository;
  constructor(photoRepos: IPhotoRepository = new PhotoRepository()) {
    super();
    this.photoRepos = photoRepos;
  }
  handle = async (command: ChangeStatusOfPhotoCommand) => {
    const photo = await this.photoRepos.findById(command.photoId);
    if (photo === null) {
      throw Error(`Can't find the photo with id: ${command.photoId}`);
    }

    if (
      [PHOTO_STATUS_HATE, PHOTO_STATUS_LIKE, PHOTO_STATUS_HIDE].includes(
        command.status,
      )
    ) {
      photo!.status = command.status;

      await this.photoRepos.update(photo!);
    } else {
      throw Error(`The status ${command.status} isn't existed.`);
    }
  };
}

export default ChangeStatusOfPhotoCommand;
