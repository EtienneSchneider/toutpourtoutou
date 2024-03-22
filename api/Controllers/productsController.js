import Product from "../Models/products.model.js";
import { stringToAge } from "../Utils/Helpers/functions.js";

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

export const getProduct = async (req, res) => {
    try {
        const product = await Product.findOne({
            serialNumber: req.query.serialNumber,
        });

        if (!product) {
            return res.status(401).send("Could not find this product.");
        }


        res.status(200).json(product);
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

export const getRecommendations = async (req, res) => {
    try {
        const allProducts = await Product.find(); 
        const dogTypes = ["any"];

        for (const dog of req.body.dogs) {
            const dogAge = stringToAge(dog.identification.birthDate);
            if (dogAge >= 12 && !dogTypes.includes("dog")) {
                dogTypes.push("dog");
            } else if (dogAge < 12 && !dogTypes.includes("puppy")) {
                dogTypes.push("puppy");
            }
        }
        const recommendations = allProducts.filter(product => dogTypes.includes(product.dogType));
        
        res.status(200).json(recommendations);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

