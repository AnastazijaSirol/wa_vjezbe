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

const findActor = (req, res, next) => {
    const id_params = parseInt(req.params.id);
    const actor = actors.find(actor => actor.id === id_params);
    if(actor){
        req.actor = actor;
        next();
    }
    else{
        return res.status(404).json("Nema actor! :(");
    }
}

export {findActor};