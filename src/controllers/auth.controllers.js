import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export async function signUp(req, res) {
    const { name, email, password } = req.body;

    try {
        const userRegistered = await db.collection("users").findOne({ email });
        if (userRegistered) return res.status(409).send("E-mail already registered");

        const hash = bcrypt.hashSync(password, 10);
        await db.collection("users").insertOne({ name, email, password: hash });
        const user = await db.collection("users").findOne({email})
        
        const token = uuid();
        await db.collection("sessions").insertOne({ userId: user._id, token });
        return res.status(200).send({ name: user.name, token });
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function signIn(req, res) {
    const { email, password } = req.body;

    try {
        const user = await db.collection("users").findOne({ email });
        if (!user) return res.status(404).send("E-mail not registered");

        const checkPw = bcrypt.compareSync(password, user.password);
        if (!checkPw) return res.status(401).send("Incorrect password");

        const token = uuid();
        await db.collection("sessions").insertOne({ userId: user._id, token });
        return res.status(200).send({ name: user.name, token });

    } catch (error) {
        return res.status(500).send(error.message);
    }
}





