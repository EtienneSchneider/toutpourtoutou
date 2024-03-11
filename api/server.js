import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./utils/routes/userRoutes.js";
import dogRoutes from "./utils/routes/dogRoutes.js";
import productRoutes from "./utils/routes/dogRoutes.js";
import "dotenv/config";

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/toutpourtoutou-api", userRoutes);
app.use("/toutpourtoutou-api", dogRoutes);
app.use("/toutpourtoutou-api", productRoutes);

mongoose
    .connect(process.env.MONGO_CONNECTION_STRING)
    .then(() => {
        console.log("connecté à la db");
        app.listen(PORT, () => {
            console.log("listen port 3001");
        });
    })
    .catch((error) => {
        console.log("problème de connexion", error);
    });
