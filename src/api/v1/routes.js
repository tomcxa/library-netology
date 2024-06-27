import { errorMiddleware } from "../../middlewares/errorMiddleware.js";
import { booksRouter } from "./books/index.js";
import { userRouter } from "./user/index.js";

const routes = [booksRouter, userRouter];

export const registrateApiV1Routes = (app) => {
  routes.forEach((router) => {
    app.use("/api", router);
  });
  app.use("/api", errorMiddleware);
};
