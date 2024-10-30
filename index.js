import express from "express";
import dotenv from "dotenv";

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.post("/signup", (req, res) => {});

app.post("/signin", (req, res) => {});

app.post("/course/purchase", (req, res) => {});

app.get("/courses", (req, res) => {});

app.listen(port, () => {
  console.log("Server listening on port 3000");
});
