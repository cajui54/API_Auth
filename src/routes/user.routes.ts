import express from "express";
import UserController from "../controller/user.controller";
import {
  checkIfFieldsAreValids,
  checkJWT_SECRETS,
} from "../middlewares/register.middlewares";

// lib para criptografar senhas

const userRouter = express.Router();

userRouter.post("/", checkJWT_SECRETS, checkIfFieldsAreValids, (req, res) => {
  return new UserController(req, res).register();
});

export default userRouter;
