import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { authValidation } from "../middlewares/authValidation.middleware.js";
import { cartItemSchema } from "../schemas/products.schema.js";
import { addToCart, checkoutCart, deleteMeteoriteFromCart, getMeteoritesFromCart } from "../controllers/cart.controllers.js";

const cartRouter = Router();

cartRouter.use(authValidation);

cartRouter.post("/cart", validateSchema(cartItemSchema), addToCart);
cartRouter.post("/delete-meteorite", deleteMeteoriteFromCart);
cartRouter.get("/get-cart", getMeteoritesFromCart)
cartRouter.delete("/checkout-cart", checkoutCart)

export default cartRouter;