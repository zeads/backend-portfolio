import express from "express";
import db from "./config/db";

const PORT = process.env.PORT || 3000;
const app = express();

const dbStatus = async () => {
  try {
    await db();
    console.log("Database connected!");
  } catch (error) {
    console.log(error);
  }
};

dbStatus();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
);
