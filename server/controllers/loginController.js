import Admin from "../models/adminModel.js"
export {
    loginPOST,
    loginGET,
};

const loginPOST = async (req, res, next) => {
    res.cookie("password", req.body.password);
    res.sendStatus(204);
    next();
};

const loginGET = async (req, res) => {
    res.status(200).json({message: "working"})
}