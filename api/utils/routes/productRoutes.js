import express from "express";
import { addProduct, getAllProducts } from "../../Controllers/productsController.js";

const router = express.Router();

router.post("/addProduct", addProduct);
router.get("/getAllProducts", getAllProducts);

export default router;
