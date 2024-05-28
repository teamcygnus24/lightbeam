import express from "express";
import {
    projectGETONE,
    projectPOST,
    projectGETALL
} from "../controllers/projectController.js";

const router = express.Router();

//Project POST
router.post("/", projectPOST)

//Project GET ONE
router.get("/:id", projectGETONE)

//Project GET ALL
router.get("/", projectGETALL)

//Project DELETE

//Project UPDATE

export default router;