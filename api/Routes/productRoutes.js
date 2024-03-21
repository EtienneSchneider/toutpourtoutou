import express from "express";
import { addProduct, getAllProducts, getRecommendations } from "../Controllers/productsController.js";

const router = express.Router();

router.post("/addProduct", addProduct);
router.get("/allProducts", getAllProducts);
router.get("/recommendations", getRecommendations);

export default router;
