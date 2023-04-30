import joi from "joi";

export const meteoriteSchema = joi.object({
    name: joi.string().required(),
    date: joi.date().raw().required(),
    description: joi.string().required(),
    location: joi.string().required(),
    picture: joi.string().uri().required(),
    fullDescription: joi.string().required(),
    price: joi.number().precision(2).required()
});

export const cartItemSchema = joi.object({
    name: joi.string().required(),
    picture: joi.string().uri().required(),
    price: joi.number().precision(2).required()
});