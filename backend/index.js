import "dotenv/config";

import express from "express";
import db from "./db/db.config.js";
import cors from "cors";
import { errorHandler } from "./src/middleware/error-handler.js";

import mainRouter from "./src/api/main.routes.js";

const app = express();
// allow requests from your frontend port
app.use(
  cors({
    origin: "http://localhost:5173", // Allow only your React app
  }),
);

app.use(express.json());
app.use("/api", mainRouter);

// Final middleware for handling errors

app.use(errorHandler);

async function startServer() {
  try {
    const connection = await db.getConnection();
    connection.release();
    // console.log("Database connection established successfully.");

    app.listen(3888, (err) => {
      if (err) {
        throw err;
      }
      console.log("Server is running on port http://localhost:3888");
    });
  } catch (error) {
    console.error("Error starting the server:", error.message);
  }
}

startServer();
