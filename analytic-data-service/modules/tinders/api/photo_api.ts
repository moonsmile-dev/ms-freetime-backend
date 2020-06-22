import PhotoModel from "../domain/models/photo_model.ts";
import { Where, getQuery } from "../../../deps.ts";
import { success_paging, success } from "../../../common/responses.ts";
import { Bus } from "../../../common/bus.ts";
import GetPhotoListQuery from "../app/queries/getPhotoListQuery.ts";
import { ListPaging } from "../../../common/paging.ts";
import ChangeStatusOfPhotoCommand from "../app/commands/changeStatusOfPhotoCommand.ts";

const bus: Bus = new Bus();

const getPhotoList = async (ctx: any) => {
  const params = getQuery(ctx, { mergeParams: true });
  const start: number = Number(params["_start"]) ?? 0;
  const end: number = Number(params["_end"]) ?? 10 ** 6;

  const dataResponse: ListPaging = await bus.dispatch(
    new GetPhotoListQuery(start, end),
  );

  return success_paging(ctx, dataResponse);
};

const reactPhotoAPI = async (ctx: any) => {
  const params = getQuery(ctx, { mergeParams: true });
  const requestBody = await ctx.request.body();
  const dataRequest = requestBody.value;

  const id: number = Number(params["id"] ?? -1);
  const status: number = Number(dataRequest.status);

  await bus.dispatch(new ChangeStatusOfPhotoCommand(id, status));

  return success(ctx, null);
};

export { getPhotoList, reactPhotoAPI };
