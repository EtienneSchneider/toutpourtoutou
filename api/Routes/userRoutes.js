import express from "express";
import { createAccount, login, verifyJWT, getStatus } from "../Controllers/usersController.js";

const router = express.Router();

router.post("/createAccount", createAccount);
router.post("/login", login);
router.get("/status", getStatus)


export default router;
