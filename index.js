import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDb from "./config/db.js";

import { UserRouter } from "./routes/user_routes.js";
import { activityRouter } from "./routes/activity_route.js";

const app = express();
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(
    cors({
        origin: ["http://localhost:5173"],
        credentials: true,
    }),
);

app.use("/api/v1/user", UserRouter);
app.use("/api/v1/activity", activityRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    connectDb();
    console.log("Server is Running");
});
