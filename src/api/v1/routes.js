import { booksRouter } from "./books/books.js";
import { userRouter } from "./user/user.js";

const routes = [booksRouter, userRouter];

export const registrateApiV1Routes = (app) => {
  routes.forEach((router) => {
    app.use("/api/v1", router);
  });
};
