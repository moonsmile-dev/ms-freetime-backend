import { Command, CommandHandler } from "../../../../common/bus.ts";
import { IUserService, UserService } from "../../services/userService.ts";
import { Location, availableLocations } from "../../domain/contants.ts";

class ChangeUserLocationCommand extends Command {
  handler = () => ChangeUserLocationCommandHandler;
}

class ChangeUserLocationCommandHandler extends CommandHandler {
  userService: IUserService;
  constructor(userService: IUserService = new UserService()) {
    super();
    this.userService = userService;
  }
  handle = async (command: ChangeUserLocationCommand) => {
    const pos: number = Math.floor(Math.random() * 4); // random from 0 --> 3

    const randomLocation: Location = availableLocations[pos];

    const status = await this.userService.changeLocationAction(randomLocation);

    if (status === true) {
      console.log(
        `You are at ${availableLocations[pos].name}.`,
      );
      return randomLocation;
    }
  };
}

export default ChangeUserLocationCommand;
