import mongoose from "mongoose";

const { ObjectId } = mongoose.Types;

const courseSchema = mongoose.Schema({
  // Course title, description, imageUrl, duration, price, content, creatorId
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  duration: {
    type: String,
  },
  creatorId: {
    type: ObjectId,
    ref: "Admin",
  },
});

export const Course = mongoose.model("Course", courseSchema);
