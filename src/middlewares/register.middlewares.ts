import { NextFunction, Request, Response } from "express";
import { isPasswordValid } from "../helpers/validation/validation-fields";
import jwt from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET not defined");
  }
  try {
    const accessToken = req.headers.authorization?.split("Bearer ")[1];
    if (!accessToken) {
      res.status(401).send({
        message: "Unauthorized",
      });
    }
    const tokenPayload = jwt.verify(accessToken!, process.env.JWT_SECRET) as {
      userId: string;
    };

    (req as any).userId = tokenPayload.userId;
  } catch (error) {
    console.log(error);
    res.status(401).send({
      message: "Unauthorized",
    });
  }
  next();
};
export const checkIfFieldsAreValids = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { password } = req.body;
  if (!isPasswordValid(password)) {
    res
      .status(400)
      .json({ message: "Invalid password, must contai n min 8 characts" });
  }
  next();
};
