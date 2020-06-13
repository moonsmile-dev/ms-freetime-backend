import { dso } from "https://deno.land/x/dso@v1.0.0/mod.ts";
import PhotoModel from "../models/photo_model.ts";

const photo_repo = dso.define(PhotoModel);

export default photo_repo;
