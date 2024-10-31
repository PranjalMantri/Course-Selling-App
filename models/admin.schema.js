import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
  // fullName, email, password
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const Admin = mongoose.model("Admin", adminSchema);
