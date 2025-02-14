import express from "express";
import UserController from "../controller/user.controller";
import {
  authMiddleware,
  checkIfFieldsAreValids,
} from "../middlewares/register.middlewares";
import { UserModel } from "../models/register/register.model";

// lib para criptografar senhas

const userRouter = express.Router();

userRouter.get("/profile", authMiddleware, async (req, res) => {
  const user = await UserModel.findById((req as any).userId);
  res.json(user);
});
userRouter.post("/register", checkIfFieldsAreValids, (req, res) => {
  return new UserController(req, res).register();
});

userRouter.post("/login", checkIfFieldsAreValids, async (req, res) => {
  return new UserController(req, res).login();
});

export default userRouter;
