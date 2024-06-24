import { Router } from "express";

export const errorsRouter = Router();

errorsRouter.get("/404", (_req, res) => {
  return res.render("pages/errors/404", {
    title: "404",
    message: "Контент не найден",
  });
});
