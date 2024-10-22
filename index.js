const express = require("express");

let app = express();

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

const port=3000;

app.listen(port, (error) => {
    if(error){
        console.log("greška")
    } else{
        console.log("slušam")
    }
});