import dotenv from "dotenv";
dotenv.config();
import connectToDatabase from "../database/mongoose-database";
import express from "express";
import userRouter from "./routes/user.routes";

const app = express();
app.use(express.json());
connectToDatabase();
app.use("/user", userRouter);

app.listen(8080, () => {
  console.log("Server is running on port 8080!");
});
