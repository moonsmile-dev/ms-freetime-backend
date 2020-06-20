import PhotoModel from "../models/photo_model.ts";
import { dso } from "../../../../deps.ts";
import { IRepository, Repository } from "./repository.ts";

interface IPhotoRepository extends IRepository<PhotoModel> {
}

class PhotoRepository extends Repository<PhotoModel>
  implements IPhotoRepository {
  constructor() {
    super(PhotoModel);
  }
}
export { IPhotoRepository, PhotoRepository };
