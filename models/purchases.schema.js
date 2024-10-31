import mongoose from "mongoose";

const { ObjectId } = mongoose.Types;

const purchaseSchema = mongoose.Schema({
  // courseId, userId
  courseId: {
    type: ObjectId,
    ref: "Course",
  },
  userId: {
    type: ObjectId,
    ref: "User",
  },
});

export const Purchase = mongoose.model("Purchase", purchaseSchema);
