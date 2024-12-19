import dotenv from "dotenv";
import express from "express";
import errorMiddleware from "./middleware/error.js";
import cookieParser from "cookie-parser";
import passport from "passport";
import session from "express-session";
import mongoose from "mongoose";
import connectMongo from "connect-mongo";
import bodyParser from "body-parser";
import cors from "cors";
import userRoutes from "./routes/userRoute.js";
import googleAuthRoutes from "./routes/googleAuthRoute.cjs";
import initializeGoogleAuth from "./googleAuth.js";

dotenv.config();

const app = express();
const MongoStore = connectMongo(session);

app.use(cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static("public"));

initializeGoogleAuth(passport);

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/v1", userRoutes);
app.use("/auth", googleAuthRoutes);

// Middleware for Errors
app.use(errorMiddleware);

export default app;
