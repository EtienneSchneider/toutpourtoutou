import express from "express";
import { saveUsers, loadUsers } from "./helpers/functions";

const router = express.Router();

router.post("/addUser", async (req, res) => {
  const newUser = req.body;
  const existingUsers = await loadUsers();
  existingUsers.push(newUser);
  await saveUsers(existingUsers);
  res.status(201).json({ message: "Users created successfully" });
});

export default router;
