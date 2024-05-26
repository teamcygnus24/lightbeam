import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cookie from "cookie";

import dotenv from "dotenv";
dotenv.config();

import loginRoutes from "./routes/loginRoutes.js";
import path from "path";

const app = express();
app.use(express.static("../client/dist")) // Use static files under client/dist
app.use((req, res, next) => {
    if (req.method === "GET" && !req.path.startsWith("/api")) {
        res.sendFile(path.resolve("../client/dist/index.html"));
    } else {
        next();
    }
})

//Connect to the database
mongoose
.connect(process.env.MONGO_URI)
.then(() => {
    console.log("Connected to the database")
    })
.catch((error) => {
        console.log(error)
    });

//Request logger
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

//Request Listener
app.listen(process.env.PORT, () => {

    console.log(`Listening to port ${process.env.PORT}`);
});

//Middleware
app.use(express.json)

//Routes
app.use("/api/login", loginRoutes);