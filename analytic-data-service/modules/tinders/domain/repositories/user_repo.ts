import UserModel from "../models/user_model.ts";
import { dso } from "../../../../deps.ts";

const user_repo = dso.define(UserModel);

export default user_repo;
