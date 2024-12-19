import app from "./app.js";
import dotenv from "dotenv";
import connectDatabase from "./db.js";
import cors from "cors";

// Middleware
app.use(cors());

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down server due to Uncaught Exception`);
  process.exit(1);
});

// Config
dotenv.config({ path: "config/config.env" });

// Connecting to database
connectDatabase();

const port = process.env.PORT || 8080;

const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down server due to Unhandled Promise Rejection`);
  server.close(() => {
    process.exit(1);
  });
});
