import express from "express";
import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

import loginRoutes from "./routes/loginRoutes.js";

const app = express();
app.use(express.static("../client/dist")) // Use static files under client/dist

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

//Routes
app.use("/api/login", loginRoutes);