import dotenv from "dotenv";
dotenv.config();
import "./database";
import express from "express";
import bcrypt from "bcryptjs"; // lib para criptografar senhas
import jwt from "jsonwebtoken";
import { UserModel } from "./database";
import { isEmailValid, isPasswordValid } from "./helpers";

const app = express();

app.use(express.json());

app.post("/register", async (req, res) => {
  try {
    if (!process.env.JWT_SECRET || !process.env.JWT_REFRESH_SECRET) {
      throw new Error("JWT_SECRET or JWT_REFRESH_SECRET not defined");
    }
    const { email, password } = req.body;

    if (!isPasswordValid(password)) {
      res
        .status(400)
        .json({ message: "Invalid password, must contai n min 8 characts" });
    }

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
    res.status(201).json({ email, tokens: { accessToken, refreshToken } });
  } catch (error) {
    res.status(500).json({ message: "Internal server error, ", error });
    console.log("Error registering user: ", error);
  }
});

app.listen(8080, () => {
  console.log("Server is running on port 8080!");
});
