import express from "express";
const router = express.Router();

export let nekretnine_polje = [
    {id: 1, naziv: "kuća", opis: "bijeli zidovi", cijena: 15000.00, lokacija: "Poreč", broj_soba: 2, povrsina: 54},
    {id: 2, naziv: "vila", opis: "uz more", cijena: 320000.00, lokacija: "Motovun", broj_soba: 5, povrsina: 70},
    {id: 3, naziv: "zgrada", opis: "drugi kat", cijena: 67000.00, lokacija: "Pula", broj_soba: 1, povrsina: 35},
]

router.get("/", (req, res) => {
    res.status(200).json(nekretnine_polje);
})

router.get("/:id", (req, res) => {
    let nekretnina_id = req.params.id;
    let n = nekretnine_polje.find(nekretnine_polje => nekretnine_polje.id == nekretnina_id);

    if(isNaN(nekretnina_id)) {
        return res.status(400).json({ message: "ID treba biti broj!" });
    }

    if(!n){
        return res.status(404).json({ message: "Narudzba s proslijeđenim ID-em ne postoji! "});
    }

    return res.status(200).json(n);
})

router.post("/dodavanje", (req, res) => {
    let nekretnina=req.body;
    let kljucevi=Object.keys(nekretnina);
    if(kljucevi.includes(nekretnina.naziv) && kljucevi.includes(nekretnina.opis) && kljucevi.includes(nekretnina.cijena) && kljucevi.includes(nekretnina.lokacija) && kljucevi.includes(nekretnina.broj_soba) && kljucevi.includes(nekretnina.povrsina)) {
        return res.status(400).json("Niste poslali sve potrebne podatke za dodavanje nove nekretnine!")
    }
    if(nekretnina.cijena<0){
        return res.json("Cijena mora biti pozitivna!");
    }
    if(nekretnina.broj_soba<0){
        return res.json("Broj soba mora biti pozitivan!");
    }
    for(let n of nekretnine_polje){
        if(nekretnina.naziv==n.naziv && nekretnina.opis==n.opis && nekretnina.cijena==n.cijena && nekretnina.lokacija==n.lokacija && nekretnina.broj_soba==n.broj_soba && nekretnina.povrsina==n.povrsina){
            return res.status(400).json("Ova nekretnina već postoji!");
        }
    }
    nekretnine_polje.push(nekretnina);
    return res.status(200).json(nekretnine_polje);

})

router.put("/potpunaizmjena/:id", (req, res) => {
    let id_nekretnine = req.params.id;
    let t = req.body;

    if(isNaN(id_nekretnine)){
        return res.status(400).json("ID mora biti broj!");
    }

    let tu_je = nekretnine_polje.find(n => n.id==id_nekretnine);

    if(!tu_je){
        return res.status(404).json("Nekretnina s navedenim ID-em ne postoji!");
    }

    nekretnine_polje[tu_je] = t;

    return res.status(200).json(nekretnine_polje[tu_je]);
})

router.patch("/djelomicnaizmjena/:id", (req, res) => {
    let id_nekretnine = req.params.id;
    let t = req.body;

    if(isNaN(id_nekretnine)){
        return res.status(400).json("ID mora biti broj!");
    }

    let tu_je = nekretnine_polje.findIndex(nekretnine_polje => nekretnine_polje.id==id_nekretnine);

    if(!tu_je){
        return res.status(404).json("Nekretnina s navedenim ID-em ne postoji!");
    }

    let kljucevi = Object.keys(t);

    for (let kljuc of kljucevi){
        if(nekretnine_polje[tu_je][kljuc] != undefined){
            nekretnine_polje[tu_je][kljuc] = t[kljuc];
        }
        else{
            nekretnine_polje[tu_je][kljuc] = nekretnine_polje[tu_je][kljuc];
        }
    }
    return res.status(200).json(nekretnine_polje[tu_je]);
})

router.delete("/brisanje/:id", (req, res) => {
    let id_nekretnine = req.params.id;
    let tu_je = nekretnine_polje.find(n => n.id == id_nekretnine);
    if (isNaN(id_nekretnine)){
        return res.json("ID mora biti broj!");
    }
    if (!tu_je){
        return res.json("Nekretnina s navedenim ID-em ne postoji!");
    }
    else {
        let obrisano=nekretnine_polje.splice(tu_je, 1);
        return res.json(nekretnine_polje);
    }

    return res.json(obrisano);
})

export default router;