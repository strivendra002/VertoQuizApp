import express from "express";
import cors from "cors";
import { connection } from "./config/db.connection.js";
import { allRoutes } from "./routes/allRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Quiz App is running ");
});
app.use("/api", allRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("DB connected");
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.error("DB connection failed:", error);
  }
});
