import express from "express"
import { findActor } from "../middelware/actors.js";
import {body, validationResult, query, param} from "express-validator"

const router = express.Router();

let actors =
[
    {
        "id": 123,
        "name": "Morgan Freeman",
        "birthYear": 1937,
        "movies": [4222334]
    },
    {
        "id": 234,
        "name": "Marlon Brando",
        "birthYear": 1924,
        "movies": [5211223]
    },
    {
        "id": 345,
        "name": "Al Pacino",
        "birthYear": 1940,
        "movies": [5211223]
    }
]

const handleErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
};

router.get(
    "/",
    [
      query("name").optional().isString().trim().escape(),
      handleErrors,
    ],
    (req, res) => {
      const { name } = req.query;
  
      let filter = actors;
      if (name) {
        filter = filter.filter((actor) =>
          actor.name.toLowerCase().includes(name.toLowerCase())
        );
      }
  
      return res.status(200).json(filter);
    }
);

router.get(
    "/:id",
    [
      param("id").isInt().escape(),
      handleErrors,
      findActor,
    ],
    (req, res) => {
      return res.status(200).json(req.actor);
    }
);

router.post(
    "/",
    [
      body("name").notEmpty().escape(),
      body("birthYear").notEmpty().escape(),
      handleErrors,
    ],
    (req, res) => {
      const { id, name, birthYear, movies } = req.body;
  
      actors.push({ id, name, birthYear, movies });
      return res.status(200).json({ id, name, birthYear, movies });
    }
);

router.patch(
    "/:id",
    [
      body("name").optional().notEmpty().escape(),
      body("birthYear").optional().escape(),
      handleErrors,
      findActor,
    ],
    (req, res) => {
      const { name, birthYear, movies } = req.body;
  
      if (name) req.actor.name = name;
      if (birthYear) req.actor.birthYear = birthYear;
      if (movies) req.actor.movies = movies;
  
      return res.status(200).json(req.actor);
    }
);  

export default router;