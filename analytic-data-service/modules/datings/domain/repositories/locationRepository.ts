import { IRepository, Repository } from "./repository.ts";
import LocationModel from "../models/locationModel.ts";

interface ILocationRepository extends IRepository<LocationModel> {
}

class LocationRepository extends Repository<LocationModel>
  implements ILocationRepository {
  constructor() {
    super(LocationModel);
  }
}

export { ILocationRepository, LocationRepository };
