import express from "express";
import { addDog, getUserDogs, sanitizeDogData } from "../Controllers/dogsController.js";

const router = express.Router();

router.post("/addDog", sanitizeDogData, addDog);
router.post("/userDogs", getUserDogs)

export default router;
