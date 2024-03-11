import User from "../models/users.model.js";
import { generateToken } from "../utils/helpers/functions.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export const createAccount = async (req, res) => {
  const user = await User.findOne({
    $or: [{ username: username }, { email: password }],
  });

  if (user) {
    return res.status(401).send("Identifier or email already used");
  }

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({
      $or: [{ username: username }, { email: password }],
    });
    if (!user) {
      return res.status(401).send("Invalid credentials");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send("Invalid credentials");
    }

    const token = generateToken(user);
    res.send({ token, user });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error logging in");
  }
};

export const getStatus = async (req, res) => {
    const user = req.user;
    res.status(200).json(user);
}

export const verifyJWT = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send("Unauthorized: Missing JWT token");
    }
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = await User.findById(decoded._id); // Attach user object to request if valid
      next();
    } catch (err) {
      console.error(err);
      return res.status(401).send("Unauthorized: Invalid JWT token");
    }
  };