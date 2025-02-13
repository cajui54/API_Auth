import { NextFunction, Request, Response } from "express";
import { isPasswordValid } from "../helpers/validation/validation-fields";

export const checkJWT_SECRETS = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!process.env.JWT_SECRET || !process.env.JWT_REFRESH_SECRET) {
    res
      .status(500)
      .json({ message: "JWT_SECRET or JWT_REFRESH_SECRET not defined" });
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
