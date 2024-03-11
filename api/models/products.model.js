import mongoose from "mongoose";

const ProductSchema = mongoose.Schema(
    {
        name: {
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
        quantity: {
            type: String,
            required: true,
            default: 0
        },
        image: {
            type: String,
        }
    }
);