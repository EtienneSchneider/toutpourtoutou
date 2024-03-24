import Dog from "../Models/dogs.model.js";
import { sanitizeObject } from "../Utils/Helpers/functions.js";
import mongoose from "mongoose";

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
        const { owner } = req.body;
        if (!mongoose.Types.ObjectId.isValid(owner)) {
            return res.status(400).json({ error: "OwnerId invalid" });
        }
        const dogs = await Dog.find({ owner: owner });
        res.status(200).json(dogs);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error getting dogs" });
    }
};

export const updateDog = async (req, res) => {
    const { chipNumber, updatedData } = req.body;

    try {
        const dog = await Dog.findOne({ chipNumber: chipNumber });
        if (!dog) {
            return res.status(401).send("Dog not found");
        }

        // Mettre à jour les attributs spécifiés dans updatedData
        for (const [key, value] of Object.entries(updatedData)) {
            if (dog[key] !== undefined) {
                dog[key] = value;
            }
        }

        const updatedDog = await dog.save();
        res.status(200).json(updatedDog);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

export const sanitizeDogData = async (req, res, next) => {
    const data = req.body;

    const identificationRule = {
        name: "string",
        gender: "boolean",
        birthDate: "string",
        breed: "string",
    };

    const healthRule = {
        sterilized: "boolean",
        weight: "object",
    };

    if (
        !sanitizeObject(data.identification, identificationRule) ||
        !sanitizeObject(data.health, healthRule) ||
        typeof data.chipNumber !== "string" ||
        data.owner === undefined
    ) {
        return res.status(401).send("Wrong dogs data");
    }
    next();
};
