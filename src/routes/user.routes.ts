import express from "express";
import bcrypt from "bcryptjs";
import UserController from "../controller/user.controller";
import {
  checkIfFieldsAreValids,
  checkJWT_SECRETS,
} from "../middlewares/register.middlewares";
import { UserModel } from "../models/register/register.model";
import generateToken from "../helpers/tokens";

// lib para criptografar senhas

const userRouter = express.Router();

userRouter.post(
  "/register",
  checkJWT_SECRETS,
  checkIfFieldsAreValids,
  (req, res) => {
    return new UserController(req, res).register();
  }
);
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  // buscar por e-mail
  const user = await UserModel.findOne({ email });

  if (!user) {
    res.status(400).json({ message: "User not found" });
  }
  // verificar senha
  const isPasswordValid = await bcrypt.compare(password, user!.password);

  if (!isPasswordValid) {
    res.status(400).json({ message: "Invalid e-mail or password!" });
  }
  // gerar token de autenticação;
  res.status(200).json({ email, tokens: generateToken(user!._id.toString()) });
});

export default userRouter;
