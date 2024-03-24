import express from "express";
import {
    addDog,
    getUserDogs,
    sanitizeDogData,
    updateDog,
} from "../Controllers/dogsController.js";

const router = express.Router();

router.post("/addDog", sanitizeDogData, addDog);
router.post("/userDogs", getUserDogs);
router.post("/updateDog", updateDog);

export default router;
