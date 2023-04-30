import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { meteoriteSchema } from "../schemas/products.schema.js";
import { addMeteorite, getMeteorite, getMeteorites } from "../controllers/products.controllers.js";
import { authValidation } from "../middlewares/authValidation.middleware.js";

const productsRouter = Router();

productsRouter.post("/add-meteorite", validateSchema(meteoriteSchema), addMeteorite);
productsRouter.get("/get-meteorites", authValidation, getMeteorites);
productsRouter.get("/get-meteorites/:id", authValidation, getMeteorite);

export default productsRouter;