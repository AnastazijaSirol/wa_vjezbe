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
    const narudzbe = req.body; 

    console.log(narudzbe);

    for (let narudzba of narudzbe) {
        const kljucevi = Object.keys(narudzba);
        if (!(kljucevi.includes('pizza') && kljucevi.includes('velicina') && kljucevi.includes('kolicina'))) {
            return res.status(400).send('Niste poslali sve potrebne podatke za narudžbu!');
        }
        const postojiPizza = pizze.some(pizze => pizze.naziv === narudzba.pizza);
        if (!postojiPizza) {
            return res.status(400).send(`Pizza "${narudzba.pizza}" ne postoji na jelovniku.`);
        }
        lista.push(narudzba);
    }
    const narucenePizze = lista.map(narudzba => `${narudzba.pizza} (${narudzba.velicina}) (${narudzba.kolicina})`).join(", ");
    res.send(`Vaša narudžba za: ${narucenePizze} je uspješno zaprimljena!`);
});


const port=3000;

app.listen(port, (error) => {
    if(error){
        console.log("greška")
    } else{
        console.log("slušam")
    } 
});