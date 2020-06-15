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

export { success, fail };
