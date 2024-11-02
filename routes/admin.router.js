import { Router } from "express";
import { Admin } from "../models/admin.schema.js";
import { Course } from "../models/course.schema.js";
import {
  UserSignInSchema,
  UserSignUpSchema,
} from "../validation/user.validation.js";
import jwt from "jsonwebtoken";
import verifyAdmin from "../middlewares/admin.js";
import mongoose from "mongoose";

const adminRouter = Router();

adminRouter.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;

  const parsedAdmin = UserSignUpSchema.safeParse({ fullName, email, password });

  if (!parsedAdmin.success) {
    return res.status(400).json({
      success: false,
      message: `Invalid credentails: ${parsedAdmin.error.errors.map(
        (error) => error.message
      )}`,
    });
  }

  const existingAdmin = await Admin.findOne({ email });

  if (existingAdmin) {
    return res.status(400).json({
      success: false,
      message: "Admin with that email already exists",
    });
  }

  const admin = await Admin.create({ fullName, email, password });

  if (!admin) {
    return res.status(400).json({
      success: false,
      message: "Something went wrong while creating the admin account",
    });
  }

  return res.status(200).json({
    succes: true,
    message: "Successfully signed up a user",
    data: admin,
  });
});

adminRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const parsedAdmin = UserSignInSchema.safeParse({ email, password });

  if (!parsedAdmin.success) {
    return res.status(400).json({
      success: false,
      message: `Invalid credentials: ${parsedAdmin.error.errors.map(
        (error) => error.message
      )}`,
    });
  }

  const existingAdmin = await Admin.findOne({ email }).select("-password");

  if (!existingAdmin) {
    return res.status(400).json({
      success: false,
      message: "Admin account does not exist",
    });
  }

  const token = jwt.sign(
    { adminId: existingAdmin._id },
    process.env.ADMIN_JWT_SECRET
  );

  console.log(token);

  const cookieOptions = {
    httpOnly: true,
    secure: true,
  };

  return res.status(200).cookie("token", token, cookieOptions).json({
    success: true,
    message: "Successfully signed in the admin",
    data: existingAdmin,
  });
});

adminRouter.post("/course", verifyAdmin, async (req, res) => {
  const adminId = req.adminId;
  const { title, description, imageUrl, price } = req.body;

  const course = await Course.create({
    title,
    description,
    imageUrl,
    price,
    creatorId: new mongoose.Types.ObjectId(adminId),
  });

  if (!course) {
    return res.status(400).json({
      success: true,
      message: "Something went wrong while creating the course",
      data: course,
    });
  }

  return res.status(200).json({
    success: true,
    message: "Successfuly created the course",
    data: course,
  });
});

adminRouter.get("/courses", (req, res) => {});

adminRouter.delete("/course", (req, res) => {});

adminRouter.put("/course", (req, res) => {});

export { adminRouter };
