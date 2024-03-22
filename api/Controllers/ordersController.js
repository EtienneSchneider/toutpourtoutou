import Order from "../Models/orders.model.js";
import Product from "../Models/products.model.js";
import mongoose from "mongoose";
import { generateRandomString } from "../Utils/Helpers/functions.js";


export const createOrder = async (req, res) => {
    req.body.orderNumber = generateRandomString(10);

    for (const orderedProduct in req.body.productsOrdered) {
        const product = await Product.findOne({
            serialNumber: orderedProduct["serialNumber"]
        })
        if (product) {
            return res.status(401).send("Product not found in database.");
        }
    }

    try {
        const newOrder = await Order.create(req.body);
        res.status(200).json(newOrder);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

export const getUserOrders = async (req, res) => {
    try {
        const { user } = req.body;
        if (!mongoose.Types.ObjectId.isValid(user)) {
            return res
                .status(400)
                .json({
                    error: "UserId invalid",
                });
        }
        const orders = await Order.find({ user: user });
        res.status(200).json(orders);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: "Error getting orders.",
        });
    }
};
