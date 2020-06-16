import PhotoModel from "../domain/models/photo_model.ts";
import photo_repo from "../domain/repositories/photo_repo.ts";
import { Where, getQuery } from "../../../deps.ts";
import { success_paging } from "../../../common/responses.ts";
import { Bus } from "../../../common/bus.ts";
import GetPhotoListQuery from "../app/queries/getPhotoListQuery.ts";
import { ListPaging } from "../../../common/paging.ts";

const bus: Bus = new Bus();

const getPhotoList = async (ctx: any) => {
  const params = getQuery(ctx, { mergeParams: true });
  const start: number = Number(params["_start"]) ?? -1;
  const end: number = Number(params["_end"]) ?? -1;

  const dataResponse: ListPaging = await bus.dispatch(
    new GetPhotoListQuery(start, end)
  );

  return success_paging(ctx, dataResponse);
};

export { getPhotoList };
