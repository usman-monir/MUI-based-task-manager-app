import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import connectToMongoDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

// connect to Mongo DB
connectToMongoDB();

const PORT = process.env.PORT || 8000;
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// request body parser middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
// cookie parser
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

const __dirname = path.resolve();

console.log("__dirname", `${__dirname}/backend/`);
app.use(
  "/images",
  express.static(path.join(`${__dirname}/backend/`, "./assets/images"))
);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("App listening on port " + PORT);
});
