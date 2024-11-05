import express from "express";
import { pizze } from "./pizze.js"
const router = express.Router();

let narudzbe_lista =[];

router.get("/", (req, res) => {
    res.json(narudzbe_lista)
})

router.get("/:id", (req, res) => {
    let id_narudzbe = req.params.id;
    console.log(`Korisnik pokašava dohvatit narudzbu s id-em ${id_narudzbe}`)
    let narudzba=narudzba.find(p => p.id===id_narudzbe);

    if (isNaN(id_narudzbe)){
        return res.status(400).json({message: 'To nije broj'});
    }
    if (!narudzba) {
        return res.status(404).json({message: 'Nema narudzbe'})
    }

    return res.status(200).json(narudzba);
})

router.post("/", (req, res) => {
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

        narudzbe_lista.push(narudzba);

    }

    const narucenePizze = narudzbe_lista.map(narudzba => `${narudzba.pizza} (${narudzba.velicina}) (${narudzba.kolicina})`).join(", ");
    res.json({
        narudzba: narudzbe_lista,
        prezime: narudzbe.prezime,
        adresa: narudzbe.adresa,
        broj_telefona: narudzbe.broj_telefona,
        message: `Vaša narudžba za ${narucenePizze} je uspješno zaprimljena!`,
        ukupna_cijena: cijena
    });

    router.delete("/:id", (req, res) => {
        let id_narudzbe=req.params.id;
        let narudzba=narudzba.find(p => p.id===id_narudzbe);
    
        if (isNaN(id_narudzbe)){
            return res.status(400).json({message: 'To nije broj'});
        }
    
        if (!narudzba) {
            return res.status(404).json({message: 'Nema narudzbe'})
        }
    
        const obrisano = narudzbe.splice(narudzba, 1);
    
        return res.json(narudzbe, "Obrisana: ", obrisano);
    })
});

export default router;
