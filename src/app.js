import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";
import productsRouter from "./routes/products.routes.js";
import cartRouter from "./routes/cart.routes.js";
import dotenv from "dotenv";

const server = express();
server.use(cors());
server.use(express.json());
server.use(authRouter);
server.use(productsRouter); 4
server.use(cartRouter);

dotenv.config();

const port = process.env.PORT || 5000;
server.listen(port, () => console.log("Server is running on port: " + port));