import { Router } from "express";
import { Purchase } from "../models/purchases.schema.js";
import { Course } from "../models/course.schema.js";
import verifyUser from "../middlewares/auth.js";
import mongoose from "mongoose";

const courseRouter = Router();

courseRouter.get("/preview", async (req, res) => {
  const courses = await Course.find({});

  if (!courses || courses.length == 0) {
    return res.status(400).json({
      success: false,
      message: "Courses do not exist",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Successfuly fetched all the courses",
    data: courses,
  });
});

courseRouter.post("/purchase", verifyUser, async (req, res) => {
  const userId = req.userId;

  const { courseId } = req.body;

  const purchase = await Purchase.create({
    courseId: new mongoose.Types.ObjectId(courseId),
    userId: new mongoose.Types.ObjectId(userId),
  });

  if (!purchase) {
    return res.status(400).json({
      success: false,
      message: "Something went wrong while creating a purchase",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Successfuly purchased the course",
    data: purchase,
  });
});

export { courseRouter };
