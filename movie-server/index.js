import express from "express";
import moviesRouter from "./routes/movies.js"
import actorsRouter from "./routes/actors.js"

const app = express();

app.use(express.json());

const loger = (req, res, next) => {
    const naziv = 'movie-server';
    const date = new Date().toLocaleString();
    const method = req.method;
    const url = req.originalUrl;
    console.log(`[${naziv}] [${date}] : ${method} ${url}`);
    next();
} 

app.use(loger);
app.use("/movies", moviesRouter);
app.use("/actors", actorsRouter);

let PORT = 3000;

app.listen(PORT, error => {
if (error) {
console.error(`Greška prilikom pokretanja poslužitelja: ${error.message}`);
} else {
console.log(`Poslužitelj dela na http://localhost:${PORT}`);
}
});
