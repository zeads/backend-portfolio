import express from "express";
import { protect } from "../middlewares/auth.middleware";
// import { globalErrorHandler } from "../middlewares/error.middleware";
import { createProject, getProjects } from "../controllers/project.controller";

const router = express.Router();

// Route yang diamankan
// Hanya admin yang punya token valid yang bisa POST project baru
// app.post("/api/projects", protect, createProject);
router.post("/", protect, createProject);
router.get("/", protect, getProjects);

// Letakkan Global Error Handler di PALING BAWAH setelah semua route
// router.use(globalErrorHandler);

export default router;
