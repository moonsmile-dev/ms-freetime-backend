import { Router, oakCors } from "../../deps.ts";
import { getPhotoList, reactPhotoAPI } from "./api/photo_api.ts";
import testNewCommandAPI from "./api/testApi.ts";

const datingRouter = new Router();

datingRouter.get("/photos", getPhotoList);
datingRouter.post("/photos/:id/react", reactPhotoAPI);
datingRouter.post("/test_command", testNewCommandAPI);

export default datingRouter;
