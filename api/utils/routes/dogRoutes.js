import express from "express";
import { addDog, sanitizeDogData } from "../../Controllers/dogsController.js";

const router = express.Router();

router.post("/addDog", sanitizeDogData, addDog)

export default router;
