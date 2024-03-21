import express from "express";
import { createOrder, getUserOrders } from "../Controllers/ordersController.js";

const router = express.Router();

router.post("/createOrder", createOrder);
router.get("/userOrders", getUserOrders);

export default router;