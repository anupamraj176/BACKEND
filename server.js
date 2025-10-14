const express = require('express');
const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.listen(3000, () => {
    console.log("Server starting at port number 3000");
})

app.get('/' , (req,res) => {
    res.send("hello ji kaise ho");
})

app.post('/api/cars' , (req,res) => {
    const {name,brand} = req.body;
    console.log(name);
    console.log(brand);
    res.send("Car Data added Successfully");
})

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://anupamr797:Rasmalaiwala%40@cluster0.jgebbdd.mongodb.net/Cars')
.then(() => {
    console.log("Connection Successfully");
})
.catch((error) => {
    console.log("Recived an error");
});