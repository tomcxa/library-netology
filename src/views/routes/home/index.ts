import { Router } from "express";

export const homeRouter = Router();

homeRouter.get("/", (_req, res) => {
  return res.render("pages/home");
});
