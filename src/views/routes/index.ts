import type { Express } from 'express'
import { booksRouter } from "./books/index.ts";
import { errorsRouter } from "./errors/index.ts";
import { homeRouter } from "./home/index.ts";

const routes = [homeRouter, booksRouter, errorsRouter];

export const registrateViewRoutes = (app: Express) => {
  routes.forEach((router) => {
    app.use("/", router);
  });
};
