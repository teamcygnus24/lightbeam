import express from "express";
import {
    templatePOST,
    templateGETONE,
    templateGETALL
} from "../controllers/templateController.js";

const router = express.Router();

//Template POST
router.post("/", templatePOST)

//Template GET ONE
router.get("/:id", templateGETONE)

//Template GET ALL
router.get("/", templateGETALL)

//Template DELETE

//Template UPDATE

export default router;