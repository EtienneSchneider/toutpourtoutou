import Dog from "../models/dogs.model.js";
import { sanitizeObject } from "../utils/helpers/functions.js";

export const addDog = async (req, res) => {
    const dog = await Dog.findOne({ chipNumber: req.body.chipNumber });
    if (dog) {
        return res.status(401).send("Chip number asigned to another dog");
    }
    try {
        const newDog = await Dog.create(req.body);
        res.status(200).json(newDog);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

export const getUserDogs = async (req, res) => {
    try {
        const dogs = await Dog.find({ owner: 'etix' });
        res.status(200).json(dogs);
    } catch (err) {
        console.error(err);
    }
};

export const sanitizeDogData = async (req, res, next) => {
    const data = req.body;

    const identificationRule = {
        name: "string",
        gender: "boolean",
        birthDate: "string",
    };

    const healthRule = {
        sterilized: "boolean",
        heathIssues: "object",
        otherHeathIssues: "object",
        treatments: "object",
        otherTreatments: "object",
    };

    const feedRule = {
        meals: "number",
        feedBasis: "object",
        otherFeedBasis: "object",
    };

    const activityRule = {
        outings: "number"
    };

    const educationRule = {
        training: "boolean",
        trainingDog: "boolean",
    };

    if (
        !sanitizeObject(data.identification, identificationRule) || 
        !sanitizeObject(data.health, healthRule) || 
        !sanitizeObject(data.feed, feedRule) || 
        !sanitizeObject(data.activity ,activityRule) || 
        !sanitizeObject(data.education ,educationRule)
    ) {
        return res.status(401).send("Wrong dogs data");
    }

    next();
};

