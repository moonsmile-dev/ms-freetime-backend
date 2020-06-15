import PhotoModel from "../models/photo_model.ts";
import { dso } from "../../../../deps.ts";

const photo_repo = dso.define(PhotoModel);

export default photo_repo;
