import { Model, BaseModel, Field, FieldType } from "../../../../deps.ts";

@Model("photos")
class PhotoModel extends BaseModel {
  @Field({
    type: FieldType.INT,
    primary: true,
    length: 11,
    autoIncrement: true,
  })
  id!: number;

  @Field({
    type: FieldType.STRING,
    length: 30,
    notNull: true,
  })
  refId!: string;

  @Field({
    type: FieldType.STRING,
    length: 500,
    notNull: true,
  })
  url!: string;

  @Field({ type: FieldType.INT, notNull: true })
  user_id!: BigInt;

  @Field({ type: FieldType.INT, notNull: true, default: 0 })
  status!: number;

  @Field({ type: FieldType.INT, notNull: true, default: 0 })
  is_synced!: number;

  @Field({ type: FieldType.STRING, notNull: true, default: "{}" })
  metadata!: string;
}

export default PhotoModel;
