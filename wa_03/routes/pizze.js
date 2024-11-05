import express from "express";

const router = express.Router();

const pizze =[
    {id: 1, naziv: "Margherita", cijena: 7.00},
    {id: 2, naziv: "Capriciosa", cijena: 9.00},
    {id: 3, naziv: "Vegetariana", cijena: 12.00},
    {id: 4, naziv: "4 sira", cijena: 15.00}
]

router.get("/", (req, res) => {
    res.json(pizze)
})

router.get("/:id", (req, res) => {
    let id_pizze = req.params.id;
    console.log(`korisnik pokašava dohvatit pizzu s id-em ${id_pizze}`)

    if (isNaN(id_pizze)){
        res.status(400).json({message: 'To nije broj'});
    }
    for(let pizza of pizze){
        if(id_pizze==pizza.id){
            return res.status(200).json(pizza);
        }
    }
    res.status(404).json({message: 'Nema pizze'})
})

router.put("/:id", (req, res) => {
    let id_pizze = req.params.id;
    let tijelo = req.body;
    
    if (isNaN(id_pizze)){
        res.status(400).json({message: 'To nije broj'});
    }

    let index = pizze.findIndex(pizza => pizza.id === id_pizze)

    pizze[index] = tijelo;
    console.log(pizze);

    return res.status(200).json({message: 'Ažurirano', tijelo})
})

router.patch("/:id", (req, res) => {
    let id_pizze = req.params.id;
    let tijelo = req.body;
    
    if (isNaN(id_pizze)){
        res.status(400).json({message: 'To nije broj'});
    }

    let index = pizze.findIndex(pizza => pizza.id == id_pizze)
    console.log(index)

    let kljucevi = Object.keys(tijelo);
    console.log(kljucevi);

    for (let kljuc of kljucevi) {
        if (pizze[index][kljuc] != tijelo[kljuc]) {
            pizze[index][kljuc] = tijelo[kljuc];
        }
        else {
            pizze[index][kljuc] = pizze[index][kljuc];
        }
    }

    pizze[index] = tijelo;
    console.log(pizze);

    return res.status(200).json({message: 'Ažurirano', tijelo})
})

export default router;
export { pizze };