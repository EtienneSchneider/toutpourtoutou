import mongoose from "mongoose";

const RecomendationSchema = mongoose.Schema(
    {
        dogType: {
            type: String,
            enum: ["dog", "puppy", "any"],
            default: any,
        },
        products: {
            type: Object, // couples product serialNumber and quantity
            required: true
        }
    }
);

const Recomendation = mongoose.model("Recomendation", RecomendationSchema);

export default Recomendation;
