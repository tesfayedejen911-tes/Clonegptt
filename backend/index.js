import "dotenv/config";

import express from "express";
import db from "./db/db.config.js";
import cors from "cors";
import { errorHandler } from "./src/middleware/error-handler.js";

import mainRouter from "./src/api/main.routes.js";

const app = express();

const allowedOrigins = [
  "https://gptclonefrontend.tesfayedejen.com",
  // "http://localhost:5173",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  }),
);

app.use(express.json());
app.use("/api", mainRouter);
app.use("/", (req, res) => {
  res.send("Server is running");
});

// Final middleware for handling errors

app.use(errorHandler);

async function startServer() {
  try {
    const connection = await db.getConnection();
    connection.release();
    // console.log("Database connection established successfully.");

    const port = process.env.PORT || 3888;
    app.listen(port, (err) => {
      if (err) {
        throw err;
      }
      console.log(`Server is running on port http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error.message);
  }
}

startServer();
