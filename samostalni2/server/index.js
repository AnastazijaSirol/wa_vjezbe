import express from "express"
import proizvodiRouter from './routes/proizvodi.js'
import narudzbeRouter from './routes/narudzbe.js'

const app = express()

app.use(express.json());

app.use("/proizvodi", proizvodiRouter);
app.use("/narudzbe", narudzbeRouter);

let PORT = 3000;

app.listen(PORT, error => {
    if (error){
        console.log("Greška");
    }
    else {
        console.log("SLUŠAM NA PORTU: " + PORT);
    }
})
