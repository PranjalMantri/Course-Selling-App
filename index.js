import express from "express";
import dotenv from "dotenv";
import { userRouter } from "./routes/user.router.js";
import { courseRouter } from "./routes/course.router.js";

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use("/user", userRouter);
app.use("/course", courseRouter);

app.listen(port, () => {
  console.log("Server listening on port 3000");
});
