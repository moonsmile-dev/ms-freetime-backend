import { Router, oakCors } from "../../deps.ts";
import { getPhotoList } from "./api/photo_api.ts";

const tinderRouter = new Router();

tinderRouter.get("/photos", oakCors(), getPhotoList);

export default tinderRouter;
