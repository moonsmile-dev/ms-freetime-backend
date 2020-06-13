import { dso } from "https://deno.land/x/dso@v1.0.0/mod.ts";
import UserModel from "../models/user_model.ts";

const user_repo = dso.define(UserModel);

export default user_repo;
