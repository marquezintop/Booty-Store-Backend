import { db } from "../database/database.connection.js";
import { ObjectId } from "mongodb";

export async function addMeteorite(req, res) {
    const { name } = req.body;

    try {
        const stocked = await db.collection("meteorites").findOne({ name });
        if (stocked) return res.status(409).send("This meteorite is already stocked");

        await db.collection("meteorites").insertOne(req.body);
        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getMeteorites(req, res) {

    try {
        const meteoritesList = await db.collection("meteorites").find().toArray();
        console.log(meteoritesList);
        res.status(200).send(meteoritesList);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getMeteorite(req, res) {
    const { id } = req.params;

    try {
        const meteorite = await db.collection("meteorites").findOne({ _id: new ObjectId(id) });
        console.log(meteorite);
        res.status(200).send(meteorite);
    } catch (err) {
        res.status(500).send(err.message);
    }
}





