import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/register/register.model";
import bcrypt from "bcryptjs";
import generateToken from "../helpers/tokens";

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

      this.res
        .status(201)
        .json({ email, tokens: generateToken(user._id.toString()) });
    } catch (error) {
      this.res.status(500).json({ message: "Internal server error, ", error });
      console.log("Error registering user: ", error);
    }
  }
}

export default UserController;
