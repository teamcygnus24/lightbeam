import express from "express";
import {
    slidePOST,
    slideGETALL,
    slideGETONE,
    slideGETproject,
    slideUPDATEONE
} from "../controllers/slideController.js";

const router = express.Router();

//Slide POST
router.post("/", slidePOST);

//Slide GET ALL
router.get("/", slideGETALL);

//Slide GET ONE
router.get("/:slideID&:projectID", slideGETONE);

//Slide GET ALL from Project
router.get("/:projectID", slideGETproject);

//slide UPDATE ONE
router.put("/:slideID", slideUPDATEONE)


export default router;