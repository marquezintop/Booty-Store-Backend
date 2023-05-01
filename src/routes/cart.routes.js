import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { authValidation } from "../middlewares/authValidation.middleware.js";
import { cartItemSchema } from "../schemas/products.schema.js";
import { addToCart, deleteMeteoriteFromCart, getMeteoritesFromCart } from "../controllers/cart.controllers.js";

const cartRouter = Router();

cartRouter.use(authValidation);

cartRouter.post("/cart", validateSchema(cartItemSchema), addToCart);
cartRouter.delete("/delete-product", validateSchema(cartItemSchema), deleteMeteoriteFromCart);
cartRouter.get("/get-cart", getMeteoritesFromCart)

export default cartRouter;