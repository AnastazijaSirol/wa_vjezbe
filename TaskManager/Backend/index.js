import express from "express";
import cors from "cors";
import taskRouter from "./routes/tasks.js";
import bcrypt from "bcrypt";
import { connectToDatabase } from "./db.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const PORT = 8000;
const JWT_SECRET = process.env.JWT_SECRET;

const app = express();
const db = await connectToDatabase();

app.use(cors());
app.use(express.json());
app.use("/tasks", taskRouter);

app.get("/", (req, res) => {
  res.send("TaskManagerBackend");
});

async function hashPassword(plainPassword, saltRounds) {
  try {
    return await bcrypt.hash(plainPassword, saltRounds);
  } catch (err) {
    console.error(`Greška pri hashiranju lozinke: ${err}`);
    return null;
  }
}

async function checkPassword(plainPassword, hashedPassword) {
  try {
    return await bcrypt.compare(plainPassword, hashedPassword);
  } catch (err) {
    console.error(`Greška pri provjeri lozinke: ${err}`);
    return false;
  }
}

async function generateJWT(payload) {
  try {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
  } catch (err) {
    console.error(`Greška pri generiranju JWT tokena: ${err}`);
    return null;
  }
}

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await db.collection("users").findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Korisničko ime već postoji" });
    }

    const hashedPassword = await hashPassword(password, 10);
    if (!hashedPassword) {
      return res.status(500).json({ message: "Greška pri hashiranju lozinke" });
    }

    const newUser = { username, password: hashedPassword };
    const result = await db.collection("users").insertOne(newUser);

    res.status(201).json({
      message: "Korisnik uspješno registriran",
      user: { id: result.insertedId, username },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Greška na poslužitelju" });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await db.collection("users").findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Neispravno korisničko ime ili lozinka" });
    }

    const isPasswordValid = await checkPassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Neispravno korisničko ime ili lozinka" });
    }

    const token = await generateJWT({ id: user._id, username: user.username });
    res.status(200).json({ token, user: { id: user._id, username: user.username } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Greška na poslužitelju" });
  }
});

app.listen(PORT, () => {
  console.log(`Poslužitelj pokrenut na portu ${PORT}`);
});
