import Template from "../models/templateModel.js"
import {response} from "express";

export {
    templatePOST,
    templateGETONE,
    templateGETALL
};

const templatePOST = async (req, res) => {

    const postTemplate = await Template.create({ name: req.body.name })

    res.status(200).json(postTemplate)
}

const templateGETONE = async (req, res) => {
}

const templateGETALL = async (req, res) => {
}