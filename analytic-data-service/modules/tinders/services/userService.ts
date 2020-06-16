import { USER_PASS_API, FB_TOKEN } from "../../../common/contants.ts";
import { FormatString } from "../../../common/strings.ts";

interface IUserService {
  hateUserAction: (userId: string) => any;
}

class UserService implements IUserService {
  hateUserAction = async (userId: string) => {
    console.log(
      `Implementing hate action to user with id :${userId}`,
    );
    try {
      const res = await fetch(FormatString(USER_PASS_API, userId), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": FB_TOKEN,
        },
      });

      const response_data = await res.json();

      if (response_data["status"] !== 200) {
        console.log(`Can't implement hating user with id ${userId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export { IUserService, UserService };
