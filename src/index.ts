import express from "express";
import "dotenv/config";
import cors from "cors";
import { notificationRoutes } from "./routes";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/notifications", notificationRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}`)
);
