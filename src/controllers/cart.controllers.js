import { db } from "../database/database.connection.js";
import { ObjectId } from "mongodb";

export async function addToCart(req, res) {
  const { name, picture, price, id} = req.body;
  const userId = res.locals;

  try {
    const meteorite = await db.collection("meteorites").findOne({_id: new ObjectId(id)});
    if(!meteorite) return res.sendStatus(409);
    

    const meteoriteCart = await db.collection("cart").findOne({id: id, userId: userId});
    if(meteoriteCart) return res.status(409).send("This item is already in your cart.");

    await db.collection("cart").insertOne({name, picture, price, userId, id});
    return res.status(200).send("Meteorite added to your cart!");
  } catch (err) {
    return res.status(500).send(err.response);
  }
};

export async function deleteMeteoriteFromCart(req, res) {
  const { name } = req.body;
  const userId = res.locals;

  try {
    const deleted = await db.collection("cart").deleteOne({name: name, userId: userId})
    console.log(deleted)
    return res.status(200).send("Product deleted successfully")
  } catch (err) {
    return res.status(500).send(err.response)
  }
}

export async function getMeteoritesFromCart(req, res) {
  const userId = res.locals;

  try {
    const cartMeteorites = await db.collection("cart").find({userId: userId}).toArray()
    console.log(cartMeteorites)
    return res.status(200).send(cartMeteorites);
  } catch (err) {
    return res.status(500).send(err.response)
  }
}

export async function checkoutCart(req, res) {
  const userId = res.locals;
  const meteoritesBought = [];
  let totalPrice = 0;


  try {
    const cartMeteorites = await db.collection("cart").find({userId: userId}).toArray();
    if (!cartMeteorites) res.status(404).send("You don't have any products in your cart.")

    cartMeteorites.map(meteorite => meteoritesBought.push(meteorite.name));
    cartMeteorites.map(meteorite => totalPrice += Number(meteorite.price))
    cartMeteorites.map(async (meteorite) => await db.collection("meteorites").deleteOne({_id: new ObjectId(meteorite.id)}))

    const user = await db.collection("users").findOne({_id: userId})
    await db.collection("meteoritesBought").insertOne({name: user.name, meteoritesBought: meteoritesBought,
    totalPrice: totalPrice})

    await db.collection("cart").deleteMany({userId: userId})
    return res.status(200).send(`Purchase made successfully. Total payable:${totalPrice}`)
  } catch (err) {
    return res.status(500).send(err.response);
  }
}