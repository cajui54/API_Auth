import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/register/register.model";
import bcrypt from "bcryptjs";

class UserController {
  req;
  res;
  constructor(req: Request, res: Response) {
    this.req = req;
    this.res = res;
  }
  async register() {
    try {
      const { email, password } = this.req.body;

      // criptografar senha with bcrypt
      const hashedPassword = bcrypt.hashSync(password, 10);
      const user = await UserModel.create({ email, password: hashedPassword });
      // gerar token de autenticação
      const accessToken = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET as string,
        { expiresIn: "15m" }
      );
      const refreshToken = jwt.sign(
        { userId: user._id },
        process.env.JWT_REFRESH_SECRET as string,
        { expiresIn: "30d" }
      );
      this.res
        .status(201)
        .json({ email, tokens: { accessToken, refreshToken } });
    } catch (error) {
      this.res.status(500).json({ message: "Internal server error, ", error });
      console.log("Error registering user: ", error);
    }
  }
}

export default UserController;
