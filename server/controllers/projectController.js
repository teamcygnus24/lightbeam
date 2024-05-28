import Project from "../models/projectModel.js"
import {response} from "express";
export {
    projectPOST,
    projectGETONE,
    projectGETALL
};

const projectPOST = async (req, res) => {

    const { name } = req.body

    try {
        const newProject = await Project.create( { name, slideCount: 0} );
        console.log("New project created: \n" + newProject);
        res.status(200).json(newProject);
    } catch (error) {
        console.log(`Something went wrong posting a new project: ${response.status} ${response.statusText}`)
    }
}

const projectGETONE = async (req, res) => {

    const projectInfo = await Project.findById(req.params.id.trim())
    console.log(projectInfo)

    res.status(200).json(projectInfo);
}

const projectGETALL = async (req, res) => {

    const projects = await Project.find( {}).sort( {createdAt: -1} );
    res.status(200).json(projects);
}