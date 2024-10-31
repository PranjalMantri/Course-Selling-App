import mongoose from "mongoose";
import dotenv from "dotenv";
import { preprocess } from "zod";

dotenv.config();

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING);
  } catch (error) {
    throw error;
  }
};

export default connectDb;
