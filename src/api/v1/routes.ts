import type {Express} from 'express'
import { errorMiddleware } from "../../middlewares/errorMiddleware.ts";
import { booksRouter } from "./books/index.ts";
import { userRouter } from "./user/index.ts";

const routes = [booksRouter, userRouter];

export const registrateApiV1Routes = (app: Express) => {
  routes.forEach((router) => {
    app.use("/api", router);
  });
  app.use("/api", errorMiddleware);
};
