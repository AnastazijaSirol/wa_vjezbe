const express = require("express");

let app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/" + "index.html")
})

app.get("/about", (req, res) => {
    res.sendFile(__dirname + "/public/" + "about.html")
})

app.get("/users", (req, res) =>{
    res.json([
        {id: 1, ime: "Anastazija", prezime: "Širol"},
        {id: 2, ime: "Anastazija", prezime: "Širol"},
        {id: 3, ime: "Anastazija", prezime: "Širol"},
    ])
})

const pizze =[
    {id: 1, naziv: "Margherita", cijena: 7.00},
    {id: 2, naziv: "Capriciosa", cijena: 9.00},
    {id: 3, naziv: "Vegetariana", cijena: 12.00},
    {id: 4, naziv: "4 sira", cijena: 15.00}
]

app.get("/pizze", (req, res) => {
    res.json(pizze)
})

app.get("/pizze/:id", (req, res) => {
    let id_pizze = req.params.id;
    console.log(`korisnik pokašava dohvatit pizzu s id-em ${id_pizze}`)

    if (isNaN(id_pizze)){
        res.json({message: 'To nije broj'});
    }
    for(let pizza of pizze){
        if(id_pizze==pizza.id){
            return res.json(pizza);
        }
    }
    res.json({message: 'Nema pizze'})
})

app.post("/naruci", (req, res) => {
    const lista = [];
    const narudzba = req.body;
    console.log(narudzba);
    const kljucevi = Object.keys(narudzba);
    console.log(kljucevi);
    for(let kljuc of kljucevi) {
        if (!(kljuc.includes('pizza') && kljuc.includes('velicina') && kljuc.includes('kolicina'))) {
            res.send('Niste poslali sve potrebne podatke za narudžbu!');
            return; 
        }
        else {
            lista.push(narudzba);
            res.send(`Narudžba za pizze: ${narudzba}`)
        }
    }
    res.send(`Vaša narudžba za ${narudzba.pizza} (${narudzba.velicina}) je uspješno
    zaprimljena!`);
    for(let kljuc of kljucevi){
        if (kljuc.pizza != 'Margherita' && kljuc.pizza !='Capriciosa' && kljuc.pizza != 'Vegetariana' && kljuc.pizza != '4 sira'){
            return res.send("Pizza ne postoji");
        }
    }

})

const port=3000;

app.listen(port, (error) => {
    if(error){
        console.log("greška")
    } else{
        console.log("slušam")
    } 
});