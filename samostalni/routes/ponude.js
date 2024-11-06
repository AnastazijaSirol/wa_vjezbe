import express from "express";
import { nekretnine_polje } from './nekretnine.js';
const router = express.Router();

let ponude_polje = [
    {id: 1, id_nekretnine: 3, ime: "Ana", prezime: "Širol", pon_cijena: 20000, broj_tel: '0914558694'}
];

router.post("/nova_ponuda", (req, res) => {
    let ponuda = req.body;
    let kljucevi = Object.keys(ponuda);

    if (!(kljucevi.includes("id_nekretnine") && kljucevi.includes("ime") && kljucevi.includes("prezime") && kljucevi.includes("pon_cijena") && kljucevi.includes("broj_tel"))) {
        return res.status(400).json("Niste poslali sve potrebne podatke za dodavanje nove ponude!");
    }

    let nekretnina_postoji = false;
    for (let n of nekretnine_polje) {
        if (n.id == ponuda.id_nekretnine) {
            nekretnina_postoji = true;
            break;
        }
    }

    if (!nekretnina_postoji) {
        return res.status(404).json("Nekretnina s navedenim id-em ne postoji!");
    }

    ponude_polje.push(ponuda);
    return res.status(200).json(ponude_polje);
});

export default router;
