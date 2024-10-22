const express = require("express");

let app = express();

app.get("/", (req, res) => {
    res.send("Hello World!")
})

const port=3001;

app.listen(port, (error) => {
    if(error){
        console.log("greška")
    } else{
        console.log("slušam")
    }
});