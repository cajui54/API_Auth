import { Request, Response } from "express";
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
  async login() {
    const { email, password } = this.req.body;
    // buscar por e-mail
    const user = await UserModel.findOne({ email });

    if (!user) {
      this.res.status(400).json({ message: "User not found" });
    }
    // verificar senha
    const isPasswordValid = await bcrypt.compare(password, user!.password);

    if (!isPasswordValid) {
      this.res.status(400).json({ message: "Invalid e-mail or password!" });
    }
    // gerar token de autenticação;
    this.res
      .status(200)
      .json({ email, tokens: generateToken(user!._id.toString()) });
  }
}

export default UserController;
