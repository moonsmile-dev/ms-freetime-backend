import {
  BaseModel,
  Defaults,
  dso,
  Field,
  FieldType,
  Join,
  Model,
  Where,
} from "https://deno.land/x/dso@v1.0.0/mod.ts";

@Model("users")
class UserModel extends BaseModel {
  // The ! operator is needed for primary key since it's never null
  @Field({
    type: FieldType.INT,
    primary: true,
    length: 11,
    autoIncrement: true,
  })
  id!: number;

  // We use ! since name is never null
  @Field({ type: FieldType.STRING, length: 50, notNull: false })
  name?: string;

  @Field({ type: FieldType.STRING, length: 200, notNull: false })
  bio?: string;

  @Field({ type: FieldType.STRING, length: 30, notNull: true })
  refId!: string;

  @Field({ type: FieldType.INT, default: 0 })
  distance_mi?: number;

  @Field({ type: FieldType.DATE })
  birthDate?: Date;
}

@Model("photos")
class PhotoModel extends BaseModel {
  @Field(
    { type: FieldType.INT, primary: true, length: 11, autoIncrement: true },
  )
  id!: number;

  @Field(
    {
      type: FieldType.STRING,
      length: 30,
      notNull: true,
    },
  )
  refId!: string;

  @Field({
    type: FieldType.STRING,
    length: 500,
    notNull: true,
  })
  url!: string;

  @Field({ type: FieldType.INT, notNull: true })
  user_id!: number;
}

export { UserModel, PhotoModel };
