import mongoose from "mongoose";

const Schema = mongoose.Schema;

const slideSchema = new Schema(
    {
        type: { type: String, required: true},
        slot1: { type: String, required: true},
        slot2: { type: String, required: true},
        slot3: { type: String, required: true},
        slot4: { type: String, required: true},

    }
);

export default mongoose.model("Slide", slideSchema);