import Admin from "../models/adminModel.js"
export {
    loginPOST,
    loginGET,
};

const loginPOST = async (req, res) => {
    const { password } = req.body;

    console.log(req.body);

    try {
        const newAdmin = await Admin.create({
            password
        });
        res.status(200).json(newAdmin);
    } catch (error) {
        res.status(400).json({error: error.message}
        );
    }
};

const loginGET = async(req, res) => {
    res.status(200).json({message: "working"})
}