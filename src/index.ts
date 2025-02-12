import dotenv from "dotenv";
dotenv.config();
import "./database";
import express from "express";
import bcrypt from "bcryptjs"; // lib para criptografar senhas
import { UserModel } from "./database";
import { isEmailValid, isPasswordValid } from "./helpers";

const app = express();

app.use(express.json());

app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!isEmailValid(email)) {
      res.status(400).json({ message: "Invalid email" });
    }
    if (!isPasswordValid(password)) {
      res
        .status(400)
        .json({ message: "Invalid password, must contain min 8 characts" });
    }

    // criptografar senha with bcrypt
    const hashedPassword = bcrypt.hashSync(password, 10);
    await UserModel.create({ email, password: hashedPassword });
    res.status(201).json({ email });
  } catch (error) {
    res.status(500).json({ message: "Internal server error, ", error });
    console.log("Error registering user: ", error);
  }
});

app.listen(8080, () => {
  console.log("Server is running on port 8080!");
});
