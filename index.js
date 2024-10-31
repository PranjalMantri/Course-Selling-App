import express from "express";
import dotenv from "dotenv";
import connectDb from "./db/db.js";

dotenv.config();

try {
  await connectDb();
  console.log("Established a connection to the database");
} catch (error) {
  console.log("Something went wrong while connecting to the databse", error);
  process.exit(1);
}

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());

import { userRouter } from "./routes/user.router.js";
import { courseRouter } from "./routes/course.router.js";
import { adminRouter } from "./routes/admin.router.js";
import errorMap from "zod/locales/en.js";

app.use("/user", userRouter);
app.use("/course", courseRouter);
app.use("/admin", adminRouter);

app.listen(port, () => {
  console.log("Server listening on port 3000");
});
