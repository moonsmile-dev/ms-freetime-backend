import { Command, CommandHandler } from "../../../../common/bus.ts";
import { IUserService, UserService } from "../../services/userService.ts";

interface Location {
  lat: number;
  lon: number;
}

const availableLocations: Array<Location> = [
  { // Hanoi
    "lat": 21.0250802,
    "lon": 105.8314253,
  },
  { // Ho Chi Minh
    "lat": 10.8686146,
    "lon": 106.7941121,
  },
  { // Hong Kong
    "lat": 22.4743124,
    "lon": 114.0560775,
  },
  { // Shang Hai
    "lat": 31.1153834,
    "lon": 121.3567003,
  },
];

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
    const randomLocation: Location =
      availableLocations[Math.floor(Math.random() * 4)]; // random from 0 --> 3

    const status = await this.userService.changeLocationAction(randomLocation);

    if (status === true) {
      console.log(
        `Change location to ${JSON.stringify(randomLocation)} successfully!`,
      );
    }
  };
}

export default ChangeUserLocationCommand;
