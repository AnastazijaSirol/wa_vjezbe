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

const findMovie = (req, res, next) => {
    const id_params = parseInt(req.params.id);
    const movie = movies.find(movie => movie.id === id_params);
    if(movie){
        req.movie = movie;
        next()
    }
    else {
        return res.status(404).json("Nema ovog movie! :(")
    }
}

export {findMovie};