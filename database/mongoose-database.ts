import mongoose from "mongoose";

const connectToDatabase = async () => {
  if (!process.env.MONGODB_URL) {
    throw new Error("MongoDB_URL is not set");
  }
  try {
    await mongoose.connect(process.env.MONGODB_URL as string);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
  }
};

export default connectToDatabase;
