import express from "express";
import dotenv from "dotenv";

import { connetDB } from "./db/connectDB.js";

import authRoutes from "./routes/auth.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    connetDB();
    console.log("Server is running on port: ", PORT);
});


//xU3CMU3aib8uXaWz
