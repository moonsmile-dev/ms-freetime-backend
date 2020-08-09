import {
  USER_PASS_API,
  AUTH_TOKEN,
  USER_LIKE_API,
  USER_LOCATION_API,
  USER_PROFILE_API,
} from "../../../common/contants.ts";
import { FormatString } from "../../../common/strings.ts";

interface Location {
  lat: number;
  lon: number;
  name: string;
}

interface IUserService {
  hateUserAction: (userId: string) => Promise<boolean>;
  loveUserAction: (userId: string) => Promise<boolean>;
  changeLocationAction: (
    data: Location,
  ) => Promise<boolean>;
  getUserProfile: () => Promise<any>;
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

      if (res.status < 200 || res.status >= 300) {
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

      if (res.status < 200 || res.status >= 300) {
        console.log(`Can't implement liking user with id: ${userId}`);
        return false;
      }
    } catch (error) {
      console.log(`Can't handle like action: ${error} with id: ${userId}`);
      return false;
    }

    return true;
  };

  changeLocationAction = async (
    data: Location,
  ): Promise<boolean> => {
    console.log(`Implementing change user location: ${data.name}`);

    try {
      const res = await fetch(USER_LOCATION_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": AUTH_TOKEN,
        },
        body: JSON.stringify(data),
      });

      if (res.status < 200 || res.status >= 300) {
        console.log(
          `Can't hanle changing user location to ${data.name}`,
        );

        return false;
      }
    } catch (error) {
      console.log(`Can't change location to ${data.name}`);
      return false;
    }
    return true;
  };

  getUserProfile = async (): Promise<any> => {
    console.log("Implementing get user profile");

    try {
      const res = await fetch(USER_PROFILE_API, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": AUTH_TOKEN,
        },
      });

      if (res.status < 200 || res.status >= 300) {
        console.log("Can't get user profile");

        throw Error();
      }

      return res.json();
    } catch (error) {
      console.log("Can't get user profile");
      throw Error("Can't fetch user profile");
    }
  };
}

export { IUserService, UserService };
