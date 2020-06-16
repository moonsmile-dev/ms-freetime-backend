import { Status } from "../deps.ts";

const success = (ctx: any, data: any) => {
  ctx.response.status = Status.OK;
  ctx.response.type = "json";
  ctx.response.body = {
    status: "success",
    message: "Successfully",
    data: data,
  };
};

const fail = (ctx: any) => {
  ctx.response.status = Status.BadRequest;
  ctx.response.type = "json";
  ctx.response.body = {
    status: "Fail",
    message: "Failed",
    data: null,
  };
};

const success_paging = (
  ctx: any,
  paging_data: { data: any; count: number }
) => {
  ctx.response.status = Status.OK;
  ctx.response.type = "json";
  ctx.response.headers.set("Access-Control-Expose-Headers", "x-total-count");
  ctx.response.headers.set("X-Total-Count", paging_data.count);
  ctx.response.body = paging_data.data;
};

export { success, fail, success_paging };
