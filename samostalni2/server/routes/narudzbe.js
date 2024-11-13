import express from "express"
import { Proizvod, proizvodi } from '../data.js';

const router = express.Router();

class Narudzba {
    constructor(id, naruceni_proizvodi){
        this.id = id;
        this.naruceni_proizvodi = naruceni_proizvodi;
    }
    get ukupnaCijena(){
        let ukupno = this.naruceni_proizvodi.reduce((suma, trenutni_proizvod) => {
            let proizvod_obj = proizvodi.find(p => p.id == trenutni_proizvod.id);
            return suma + proizvod_obj.cijena*trenutni_proizvod.narucena_kolicina;
        }, 0);
        return ukupno;
    }
}

let narudzbe = [
    new Narudzba (1, [
        {id: 1, velicina: 'M', boja: 'crna', narucena_kolicina: 2},
        {id: 3, velicina: 'onesize', boja: 'šareno', narucena_kolicina: 1},
    ])
];


router.post("/", (req, res) => {
    let podaci = req.body;

    console.log(podaci);
    
    let naruceni_proizvodi = podaci.naruceni_proizvodi;
    
    let id_nove_narudzbe = narudzbe.length ? narudzbe.at(-1).id + 1 : 1;

    let narudzba_obj = new Narudzba(id_nove_narudzbe, naruceni_proizvodi);

    narudzbe.push(narudzba_obj);

    console.log(narudzbe);

    return res.status(201).json(podaci);
})

export default router;