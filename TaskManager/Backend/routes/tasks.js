import express from "express";
import { connectToDatabase } from "../db.js";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const router = express.Router();
const db = await connectToDatabase();

async function verifyJWT(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.error(`Greška pri verifikaciji JWT tokena: ${err.message}`);
    return null;
  }
}

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Nedostaje JWT token" });
  }

  const token = authHeader.split(" ")[1];
  const decoded = await verifyJWT(token);
  if (!decoded) {
    return res.status(401).json({ message: "Nevaljan JWT token" });
  }

  req.authorisedUser = decoded;
  next();
};

router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.authorisedUser.id;
    const tasks = await db.collection("tasks").find({ userId: new ObjectId(userId) }).toArray();

    res.status(200).json(tasks.map(task => ({ ...task, _id: task._id.toString() })));
  } catch (error) {
    res.status(500).json({ message: "Greška pri dohvaćanju zadataka", error });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  const { naslov, opis, zavrsen, tags } = req.body;

  try {
    const userId = req.authorisedUser.id;

    const newTask = {
      naslov,
      opis,
      zavrsen: zavrsen || false,
      tags: tags || [],
      userId: new ObjectId(userId),
    };

    const result = await db.collection("tasks").insertOne(newTask);
    res.status(201).json({ insertedId: result.insertedId.toString() });
  } catch (error) {
    res.status(500).json({ message: "Greška pri dodavanju zadatka", error });
  }
});

router.patch("/:id", authMiddleware, async (req, res) => {
  const taskId = req.params.id;

  try {
    if (!ObjectId.isValid(taskId)) {
      return res.status(400).json({ message: "Neispravan ID zadatka" });
    }

    const userId = req.authorisedUser.id;
    const result = await db.collection("tasks").updateOne(
      { _id: new ObjectId(taskId), userId: new ObjectId(userId) },
      { $set: { zavrsen: true } }
    );

    if (result.modifiedCount === 1) {
      res.status(200).json({ message: "Zadatak ažuriran" });
    } else {
      res.status(404).json({ message: "Zadatak nije pronađen" });
    }
  } catch (error) {
    res.status(500).json({ message: "Greška pri ažuriranju zadatka", error });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  const taskId = req.params.id;

  try {
    if (!ObjectId.isValid(taskId)) {
      return res.status(400).json({ message: "Neispravan ID zadatka" });
    }

    const userId = req.authorisedUser.id;
    const result = await db.collection("tasks").deleteOne({
      _id: new ObjectId(taskId),
      userId: new ObjectId(userId),
    });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: "Zadatak obrisan" });
    } else {
      res.status(404).json({ message: "Zadatak nije pronađen" });
    }
  } catch (error) {
    res.status(500).json({ message: "Greška pri brisanju zadatka", error });
  }
});

export default router;
