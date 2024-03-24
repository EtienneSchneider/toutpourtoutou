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
    const { chipNumber } = req.body; // Obtenez le numéro de puce du chien à mettre à jour
    const updatedDogData = req.body; // Obtenez les nouvelles données du chien depuis le corps de la requête

    try {
        // Recherchez le chien par son numéro de puce
        const dog = await Dog.findOne({ chipNumber });

        if (!dog) {
            return res.status(404).json({ message: 'Chien non trouvé' });
        }

        // Mettez à jour les données du chien avec les nouvelles données
        dog.set(updatedDogData);

        // Sauvegardez les modifications dans la base de données
        await dog.save();

        return res.status(200).json({ message: 'Chien mis à jour avec succès', updatedDog: dog });
    } catch (error) {
        console.error('Erreur lors de la mise à jour du chien :', error);
        return res.status(500).json({ message: 'Erreur lors de la mise à jour du chien' });
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
