import mongoose from "mongoose";

const ProductSchema = mongoose.Schema(
    {
        serialNumber: {
            type: String,
            required: [true, "Please enter product serial number"]
        },
        brand: {
            type: String,
            required: [true,"Please enter product name"]
        },
        description: {
            type: String,
            required: [true,"Please enter product description"]
        },
        type: {
            type: String,
            enum: ["food", "toy", "hygiene"],
            required: true
        },
        dogType: {
            type: String,
            enum: ["dog", "puppy", "sterilized","any"],
            default: "any",
        },
        image: {
            type: String,
            required: true
        },
        price: {
            type: String,
            required: true
        }
    }
);

const Product = mongoose.model("Product", ProductSchema);

export default Product;
