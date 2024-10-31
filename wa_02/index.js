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

    if (!narudzbe.prezime || !narudzbe.adresa || !narudzbe.broj_telefona) {
        return res.status(400).send('Niste poslali sve potrebne podatke o korisniku!');
    }

    let cijena = 0;

    for (let narudzba of narudzbe.narudzba) {
        const kljucevi = Object.keys(narudzba);

        if (!(kljucevi.includes('pizza') && kljucevi.includes('velicina') && kljucevi.includes('kolicina'))) {
            return res.status(400).send('Niste poslali sve potrebne podatke za narudžbu!');
        }

        const postoji = pizze.find(p => p.naziv === narudzba.pizza);
        if (!postoji) {
            return res.status(400).send(`Pizza "${narudzba.pizza}" ne postoji na jelovniku.`);
        }

        cijena += postoji.cijena * narudzba.kolicina;

        lista.push(narudzba);
    }

    const narucenePizze = lista.map(narudzba => `${narudzba.pizza} (${narudzba.velicina}) (${narudzba.kolicina})`).join(", ");
    res.json({
        narudzba: lista,
        prezime: narudzbe.prezime,
        adresa: narudzbe.adresa,
        broj_telefona: narudzbe.broj_telefona,
        message: `Vaša narudžba za ${narucenePizze} je uspješno zaprimljena!`,
        ukupna_cijena: cijena
    });
});



const port=3000;

app.listen(port, (error) => {
    if(error){
        console.log("greška")
    } else{
        console.log("slušam")
    } 
});