import express from "express";
import {
    slidePOST,
    slideGETALL,
    slideGETONE
} from "../controllers/slideController.js";

const router = express.Router();

//Slide POST
router.post("/", slidePOST);

//Slide GET ALL
router.get("/", slideGETALL);

//Slide GET ONE
router.get("/:projectID&:templateID", slideGETONE);


export default router;