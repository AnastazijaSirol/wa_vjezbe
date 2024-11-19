import express from "express";
import fs from "fs/promises";

const app = express();

app.use(express.json());

app.get("/zaposlenici", async (req, res) => {
    let pozicija_query = req.query.pozicija;
    let godine_staza_min = req.query.godine_staza_min;
    let godine_staza_max = req.query.godine_staza_max;
    let sortiraj_godine = req.query.sortiraj_godine;
    try {
        const data = await fs.readFile('./zaposlenici.json')
        const data_query = JSON.parse(data);
        if(pozicija_query) {
            const filtrirano = data_query.filter(zaposlenik => zaposlenik.pozicija == pozicija_query);
            return res.json(filtrirano);
        }
        if(godine_staza_min){
            const filtrirano = data_query.filter(zaposlenik => zaposlenik.god_staza >= godine_staza_min);
            return res.json(filtrirano);
        }
        if(godine_staza_max){
            const filtrirano = data_query.filter(zaposlenik => zaposlenik.god_staza <= godine_staza_max);
            return res.json(filtrirano);
        }
        if(sortiraj_godine){
            if(sortiraj_godine == 'uzlazno'){
                let uzlazno = data_query.sort((a, b) => a.god_staza - b.god_staza);
                return res.status(200).json(uzlazno);
            }
            else if (sortiraj_godine == 'silazno'){
                let silazno = data_query.sort((a, b) => b.god_staza - a.god_staza);
                return res.status(200).json(silazno);
            }
        }
        
        return res.status(200).send(data_query);
    }
    catch (error) {
        res.status(400).send("Greška u čitanju!");
    }
})

app.get("/zaposlenici/:id", async (req, res) => {
    let id_zaposlenika = req.params.id;
    try{
        const data = await fs.readFile('./zaposlenici.json');
        const data1 = JSON.parse(data);
        let pronaden = data1.find(zaposlenik => zaposlenik.id==id_zaposlenika);
        return res.status(200).json(pronaden);
    }
    catch (error){
        return res.status(400).send("Greška");
    }
})

app.post("/zaposlenici", async (req, res) => {
    let zaposlenik = req.body;
    let kljucevi = Object.keys(zaposlenik);
    for(let kljuc of ['id', 'ime', 'prezime', 'god_staza', 'pozicija']){
        if (!(kljucevi.includes(kljuc))){
            return res.status(400).json("Nema svih potrebnih podataka");
        }
    }

    try {
        const data = await fs.readFile('./zaposlenici.json');
        const data1 = JSON.parse(data);
        data1.push(zaposlenik)
        await fs.writeFile('./zaposlenici.json', JSON.stringify(data1));
        return res.status(200).json(data1);
    }
    catch(error){
        return res.status(400).json("Greška");
    }
})

const PORT = 3000;

app.listen(PORT, (err) => {
    if(err){
        console.log("greška");
    }
    else{
        console.log("dela na " + PORT);
    }
})
