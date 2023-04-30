import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";
import productsRouter from "./routes/products.routes.js";

const server = express();
server.use(cors());
server.use(express.json());
server.use(authRouter);
server.use(productsRouter);

const PORT = 5000;
server.listen(PORT, () => console.log("Server is running on port: " + PORT))