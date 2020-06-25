import { Model, BaseModel, Field, FieldType } from "../../../../deps.ts";

@Model("locations")
class LocationModel extends BaseModel {
  @Field(
    { type: FieldType.INT, primary: true, length: 11, autoIncrement: true },
  )
  id!: number;

  @Field({ type: FieldType.STRING, length: 30, notNull: true })
  latitude!: string;

  @Field({ type: FieldType.STRING, length: 30, notNull: true })
  longitude!: string;

  @Field({ type: FieldType.STRING, length: 50, notNull: true })
  name?: string;

  @Field({ type: FieldType.INT, notNull: true })
  user_id!: BigInt;
}

export default LocationModel;
