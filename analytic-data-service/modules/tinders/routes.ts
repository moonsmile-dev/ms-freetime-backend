import { Router, oakCors } from "../../deps.ts";
import { getPhotoList, reactPhotoAPI } from "./api/photo_api.ts";
import testNewCommandAPI from "./api/testApi.ts";

const tinderRouter = new Router();

tinderRouter.get("/photos", oakCors(), getPhotoList);
tinderRouter.post("/photos/:id/react", reactPhotoAPI);

export default tinderRouter;
