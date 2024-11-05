import express from "express";
import pizzeRouter from './routes/pizze.js';
import narudzbeRouter from './routes/narudzbe.js';

let app = express();

app.use(express.json());
app.use("/pizze", pizzeRouter);
app.use("/narudzbe", narudzbeRouter);


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/" + "index.html")
})

app.get("/about", (req, res) => {
    res.sendFile(__dirname + "/public/" + "about.html")
})

const pizze =[
    {id: 1, naziv: "Margherita", cijena: 7.00},
    {id: 2, naziv: "Capriciosa", cijena: 9.00},
    {id: 3, naziv: "Vegetariana", cijena: 12.00},
    {id: 4, naziv: "4 sira", cijena: 15.00}
]

app.get("/users", (req, res) =>{
    res.json([
        {id: 1, ime: "Anastazija", prezime: "Širol"},
        {id: 2, ime: "Anastazija", prezime: "Širol"},
        {id: 3, ime: "Anastazija", prezime: "Širol"},
    ])
})

const port=3000;

app.listen(port, (error) => {
    if(error){
        console.log("greška")
    } else{
        console.log("slušam")
    } 
});