import { Router } from "express";

const adminRouter = Router();

adminRouter.post("/signup", (req, res) => {});

adminRouter.post("/signin", (req, res) => {});

adminRouter.get("/courses", (req, res) => {});

adminRouter.delete("/course", (req, res) => {});

adminRouter.put("/course", (req, res) => {});

export { adminRouter };
