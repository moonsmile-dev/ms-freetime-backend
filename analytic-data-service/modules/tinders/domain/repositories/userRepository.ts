import UserModel from "../models/user_model.ts";
import { dso } from "../../../../deps.ts";
import { Repository, IRepository } from "./repository.ts";

interface IUserRepository extends IRepository<UserModel> {
}

class UserRepository extends Repository<UserModel> implements IUserRepository {
  constructor() {
    super(UserModel);
  }
}

export { IUserRepository, UserRepository };
