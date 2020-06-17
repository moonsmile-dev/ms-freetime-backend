import {
  USER_PASS_API,
  AUTH_TOKEN,
  USER_LIKE_API,
} from "../../../common/contants.ts";
import { FormatString } from "../../../common/strings.ts";

interface IUserService {
  hateUserAction: (userId: string) => Promise<boolean>;
  loveUserAction: (userId: string) => Promise<boolean>;
}

class UserService implements IUserService {
  defaultHeader: any = null;
  constructor() {
    this.defaultHeader = {
      "Content-Type": "application/json",
      "X-Auth-Token": AUTH_TOKEN,
    };
  }
  hateUserAction = async (userId: string): Promise<boolean> => {
    console.log(
      `Implementing hate action to user with id :${userId}`,
    );
    try {
      const res = await fetch(FormatString(USER_PASS_API, userId), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": AUTH_TOKEN,
        },
      });

      if (res.status < 200 && res.status >= 300) {
        console.log(`Can't implement hating user with id: ${userId}`);
        return false;
      }
    } catch (error) {
      console.log(`Can't handle hate action: ${error} with id: ${userId}`);
      return false;
    }

    return true;
  };

  loveUserAction = async (userId: string): Promise<boolean> => {
    console.log(
      `Implementing love action to user with id :${userId}`,
    );

    try {
      const res = await fetch(FormatString(USER_LIKE_API, userId), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": AUTH_TOKEN,
        },
      });

      if (res.status < 200 && res.status >= 300) {
        console.log(`Can't implement liking user with id: ${userId}`);
        return false;
      }
    } catch (error) {
      console.log(`Can't handle like action: ${error} with id: ${userId}`);
      return false;
    }

    return true;
  };
}

export { IUserService, UserService };
