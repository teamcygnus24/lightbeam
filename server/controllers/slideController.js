import Slide from "../models/slideModel.js"

export {
    slidePOST,
    slideGETALL,
    slideGETONE
};

const slidePOST = async (req, res) => {

    const postSlide = await Slide.create(
        {
            projectID: req.body.projectID,
            templateID: req.body.templateID
        }
    );

    res.status(200).json(postSlide)
};

const slideGETALL = async (req, res) => {

};

const slideGETONE = async (req, res) => {

};
