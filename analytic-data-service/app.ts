import { Application, Router, Status } from "https://deno.land/x/oak/mod.ts";

import timer from "./middleware/timer.ts";
import logger from "./middleware/logger.ts";
import error from "./middleware/error.ts";

const app = new Application();
const router = new Router();

app.use(logger);
app.use(timer);
app.use(error);

router.get("/", (ctx) => {
  ctx.response.status = Status.OK;
  ctx.response.type = "json";
  ctx.response.body = {
    status: "success",
    message: "Hello World!",
    data: null,
  };
});

app.use(router.routes());

console.log("app running -> http://localhost:3000");
await app.listen({ port: 3000 });
