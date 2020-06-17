import { Model, BaseModel, Field, FieldType } from "../../../../deps.ts";
import { USER_STATUS_DRAFT } from "../contants.ts";

@Model("partners")
class UserModel extends BaseModel {
  // The ! operator is needed for primary key since it's never null
  @Field({
    type: FieldType.INT,
    primary: true,
    length: 11,
    autoIncrement: true,
  })
  id!: BigInt;

  // We use ! since name is never null
  @Field({ type: FieldType.STRING, length: 50, notNull: false })
  name?: string;

  @Field({ type: FieldType.STRING, length: 200, notNull: false })
  bio?: string;

  @Field({ type: FieldType.STRING, length: 30, notNull: true })
  refId!: string;

  @Field({ type: FieldType.INT, default: 0 })
  distance_mi?: number;

  @Field({ type: FieldType.INT, default: Date.now() })
  birth_date?: BigInt;

  @Field({ name: "status", type: FieldType.INT, default: USER_STATUS_DRAFT })
  status!: number;
}

export default UserModel;
