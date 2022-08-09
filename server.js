const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.listen(
    4000, 
    () => console.log("Time to Krummmble")
)

app.get("/associations", (req, res) => {
    res.send("all the associations")
})

app.get("/associations/:id", (req,res) => {
    res.send("this association")
})

app.get("/associations/:tag", (req,res) => {
    res.send("this association")
})

app.post("associations/:id", (req,res) => {
    res.send("associations modify")
})

app.post("associations/create", (req,res) => {
    res.send("create association")
})
