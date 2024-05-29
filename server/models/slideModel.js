import mongoose from "mongoose";

const Schema = mongoose.Schema;

const slideSchema = new Schema (
    {
        projectID: { type: String, required: true },
        templateID: { type: String, required: true },
        text: { type: String }
    }
);

export default mongoose.model("Slide", slideSchema);