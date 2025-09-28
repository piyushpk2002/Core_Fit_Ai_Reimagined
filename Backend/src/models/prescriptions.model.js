import mongoose from "mongoose";


const prescriptionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    diet: {
        type: String
    },
    workout: {
        type: String
    },
    bmi: {
        type: Number
    }

},
{
    timestamps: true
});

const Prescriptions = mongoose.model("Prescriptions", prescriptionSchema);

export default Prescriptions;