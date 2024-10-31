import { Router } from "express";
import {
  UserSignInSchema,
  UserSignUpSchema,
} from "../validation/user.validation.js";
import { User } from "../models/user.schema.js";
import jwt from "jsonwebtoken";

const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;

  const parsedUser = UserSignInSchema.safeParse({ fullName, email, password });

  if (!parsedUser.success) {
    return res.status(400).json({
      success: false,
      message: `Invalid credentails: ${parsedUser.error.errors.map(
        (error) => error.message
      )}`,
    });
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "User with that email already exists",
    });
  }

  const user = await User.create({ fullName, email, password });

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Something went wrong while creating the user account",
    });
  }

  return res.status(200).json({
    succes: true,
    message: "Successfully signed up a user",
    data: user,
  });
});

userRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const parsedUser = UserSignInSchema.safeParse({ email, password });

  if (!parsedUser.success) {
    return res.status(400).json({
      success: false,
      message: `Invalid credentials: ${parsedUser.error.errors.map(
        (error) => error.message
      )}`,
    });
  }

  const existingUser = await User.findOne({ email }).select("-password");

  if (!existingUser) {
    return res.status(400).json({
      success: false,
      message: "User does not exist",
    });
  }

  const token = jwt.sign(
    { userId: existingUser._id },
    process.env.USER_JWT_SECRET
  );

  const cookieOptions = {
    httpOnly: true,
    secure: true,
  };

  return res.status(200).cookie("token", token, cookieOptions).json({
    success: true,
    message: "Successfully signed in the user",
    data: existingUser,
  });
});

userRouter.get("/purchase", (req, res) => {});

export { userRouter };
