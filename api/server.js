import express from "express";
import cors from "cors";
import userRoutes from "./utils/routes/userRoutes";

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", userRoutes);

app.listen(PORT, () => {
  console.log("listen port 3001");
});
