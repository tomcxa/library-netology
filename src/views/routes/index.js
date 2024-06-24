import { booksRouter } from "./books/index.js";
import { errorsRouter } from "./errors/index.js";
import { homeRouter } from "./home/index.js";

const routes = [homeRouter, booksRouter, errorsRouter];

export const registrateViewRoutes = (app) => {
  routes.forEach((router) => {
    app.use("/", router);
  });
};
