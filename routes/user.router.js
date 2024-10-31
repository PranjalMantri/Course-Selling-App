import { Router } from "express";
import { UserSchema } from "../validation/user.validation.js";
import { User } from "../models/user.schema.js";

const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;

  const parsedUser = UserSchema.safeParse({ fullName, email, password });

  if (!parsedUser.success) {
    return res.status(400).json({
      success: false,
      message: `Invalid credentails: ${parsedUser.error.errors.map(
        (error) => error.message
      )}`,
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

userRouter.post("/signin", (req, res) => {});

userRouter.get("/purchase", (req, res) => {});

export { userRouter };
