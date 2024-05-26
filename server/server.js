import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cookie from "cookie";
import loginRoutes from "./routes/loginRoutes.js";
import * as path from "path";
import dotenv from "dotenv";

//Load environment variables
dotenv.config();

//Create express app
const app = express();

// Use static files under client/dist
app.use(express.static(path.join(__dirname, '../client/dist'))); 

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

// Catch-all handler to serve the React app for any other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

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
