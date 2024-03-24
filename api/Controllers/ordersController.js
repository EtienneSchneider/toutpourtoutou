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

export const modifyOrder = async (req, res) => {
    try {
        const { orderNumber, productSN, newQuantity } = req.body;

        const order = await Order.findOne({ orderNumber: orderNumber});
        if (!order) {
            return res.status(404).json({ error: 'Order not found.' });
        }

        const prodToChange = order.orderedProducts.find(p => p.serialNumber === productSN);

        if(prodToChange){
            if(newQuantity == 0){
                let indexToRem = order.orderedProducts.indexOf(prodToChange);
                order.orderedProducts.splice(indexToRem, 1); 
            }
            else{
                console.log(newQuantity)
                let indexToMod = order.orderedProducts.indexOf(prodToChange);
                order.orderedProducts[indexToMod] = {serialNumber: productSN, quantity: newQuantity};
            }
        }
        else{
            order.orderedProducts.push({serialNumber: productSN, quantity: newQuantity});
        }

        order.markModified('orderedProducts');
        await order.save();

        res.status(200).json({ message: 'Chien mis à jour avec succès',order: order});
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: "Error modifying order.",
        });
    }
};
