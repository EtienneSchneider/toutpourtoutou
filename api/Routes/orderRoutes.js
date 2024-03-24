import express from "express";
import { createOrder, getUserOrders, modifyOrder } from "../Controllers/ordersController.js";

const router = express.Router();

router.post("/createOrder", createOrder);
router.post("/modifyOrder", modifyOrder);
router.post("/userOrders", getUserOrders);

export default router;