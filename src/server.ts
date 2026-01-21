import express from "express";
import db from "./config/db";
import projectRouter from "./routes/project.route";
import authRouter from "./routes/auth.route";
import { globalErrorHandler } from "./middlewares/error.middleware";

const PORT = process.env.PORT || 3000;
const app = express();

const dbStart = async () => {
  try {
    await db();
    console.log("Database connected!");
  } catch (error) {
    console.log(error);
  }
};

dbStart();

app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/projects", projectRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(globalErrorHandler);

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
);
