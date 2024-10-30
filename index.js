import express from "express";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());

import { userRouter } from "./routes/user.router.js";
import { courseRouter } from "./routes/course.router.js";
import { adminRouter } from "./routes/admin.router.js";

app.use("/user", userRouter);
app.use("/course", courseRouter);
app.use("/admin", adminRouter);

app.listen(port, () => {
  console.log("Server listening on port 3000");
});
