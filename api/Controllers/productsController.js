import Product from "../models/products.model.js";

export const addProduct = async (req, res) => {
    const product = await Product.findOne({
        serialNumber: req.body.serialNumber,
    });
    if (product) {
        return res.status(401).send("Serial number asigned to another product");
    }
    try {
        const newProduct = await Product.create(req.body);
        res.status(200).json(newProduct);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
