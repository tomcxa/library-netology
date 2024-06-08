import { Router } from "express";

export const userRouter = Router();

userRouter.post("/user/login", (_req, res) => {
  res.json({ id: 1, mail: "test@mail.ru" });
});
