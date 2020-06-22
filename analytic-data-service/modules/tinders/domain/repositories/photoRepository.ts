import PhotoModel from "../models/photo_model.ts";
import { dso, Where } from "../../../../deps.ts";
import { IRepository, Repository } from "./repository.ts";

interface IPhotoRepository extends IRepository<PhotoModel> {
  findByUserIdAndRefId: (userId: string, refId: string) => Promise<PhotoModel>;
}

class PhotoRepository extends Repository<PhotoModel>
  implements IPhotoRepository {
  constructor() {
    super(PhotoModel);
  }

  findByUserIdAndRefId = async (
    userId: string,
    refId: string
  ): Promise<PhotoModel> => {
    return this.findOne(
      Where.expr(`user_id='${userId}' and ref_id='${refId}'`)
    );
  };
}
export { IPhotoRepository, PhotoRepository };
