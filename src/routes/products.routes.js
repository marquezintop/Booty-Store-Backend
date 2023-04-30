import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { meteoriteSchema } from "../schemas/products.schema.js";
import { addMeteorite, getMeteorites } from "../controllers/products.controllers.js";

const productsRouter = Router();

productsRouter.post("/add-meteorite", validateSchema(meteoriteSchema), addMeteorite);
productsRouter.get("/get-meteorites", getMeteorites);

export default productsRouter;