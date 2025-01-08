import express from "express"
import {findMovie} from "../middelware/movies.js"
import {body, validationResult, query, param} from "express-validator"

const router = express.Router();

let movies = 
[
    {
        "id": 4222334,
        "title": "The Shawshank Redemption",
        "year": 1994,
        "genre": "Drama",
        "director": "Frank Darabont"
    },
    {
        "id": 5211223,
        "title": "The Godfather",
        "year": 1972,
        "genre": "Crime",
        "director": "Francis Ford Coppola"
    },
    {
        "id": 4123123,
        "title": "The Dark Knight",
        "year": 2008,
        "genre": "Action",
        "director": "Christopher Nolan"
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
      query("min_year").optional().isInt({ min: 1800 }).escape(),
      query("max_year").optional().isInt({ min: 1800 }).escape(),
      handleErrors,
    ],
    (req, res) => {
      const { min_year, max_year } = req.query;
  
      let filter = movies;
  
      if (min_year && max_year && parseInt(min_year) >= parseInt(max_year)) {
        return res.status(400).json({
          errors: [{ msg: "min_year mora bit manja od max_year" }],
        });
      }
  
      if (min_year) {
        filter = filter.filter(
          (movie) => movie.year >= parseInt(min_year)
        );
      }
  
      if (max_year) {
        filter = filter.filter(
          (movie) => movie.year <= parseInt(max_year)
        );
      }
  
      return res.status(200).json(filter);
    }
);  

router.get("/:id", [param("id").isInt().escape(), handleErrors, findMovie], (req, res) => {
    return res.status(200).json(req.movie);
})

router.post("/", [body("id").notEmpty().escape(), body("title").notEmpty().escape(), body("year").notEmpty().escape(), body("genre").notEmpty().escape(), body("director").notEmpty().escape(), handleErrors], (req, res) => {
    const {id, title, year, genre, director} = req.body;
    movies.push({id, title, year, genre, director});
    return res.status(200).json({id, title, year, genre, director});
})

router.patch("/:id", [body("title").optional().notEmpty().escape(), body("year").optional().notEmpty().escape(), body("genre").optional().notEmpty().escape(), body("director").optional().notEmpty().escape(), handleErrors, findMovie], (req, res) => {
    const {title, year, genre, director} = req.body;
    if(title) req.movie.title = title;
    if(year) req.movie.year = year;
    if(genre) req.movie.genre = genre;
    if(director) req.movie.director = director;
    return res.status(200).json(req.movie);
})

export default router;