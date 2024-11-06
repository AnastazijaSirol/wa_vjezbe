import express from "express";
import nekretnineRouter from './routes/nekretnine.js'
import ponudeRouter from './routes/ponude.js'

let app = express();

app.use(express.json());
app.use("/nekretnine", nekretnineRouter);
app.use("/ponude", ponudeRouter);

app.get("/", (req, res) => {
    return res.status(200).json("Agencija za nekretnine")
})

const port = 3000;

app.listen(port, (error) => {
    if (error){
        console.log("Greška " + error);
    }
    else {
        console.log(`Slušam na portu ${port}`);
    }
})