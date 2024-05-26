import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cookie from "cookie";

import dotenv from "dotenv";
dotenv.config();

import loginRoutes from "./routes/loginRoutes.js";
import * as path from "path";

const app = express();
app.use(express.static("../client/dist")) // Use static files under client/dist

//Middleware
app.use(express.json())
app.use(cookieParser(process.env.COOKIE_SECRET))

//Request logger
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});


//Routes
app.use("/api/login", loginRoutes);

//Connect to the database
mongoose
.connect(process.env.MONGO_URI)
.catch((error) => {
        console.log(error)
    })
.then(() => {
    console.log("Connected to the database")


})
//Request Listener
app.listen(process.env.PORT, () => {

    console.log(`Listening to port ${process.env.PORT}`);
});
