const express = require("express");
const app = express();

//load config from env
require('dotenv').config();

const PORT = process.env.PORT || 4000;

//middleware to parse to json request body
app.use(express.json());

//import routes for todo api
const todoRoutes = require('./routes/todos');

//mount the todo api
app.use('/api/v1',todoRoutes);

//start the server

app.listen(PORT, () => {
    console.log(`server started successfully at ${PORT}`);
})

//connect to the data base
const dbConnect = require('./config/database');
dbConnect();

//default route
app.get("/",(req,res)=> {
    res.send(`<h>This is homepage</h>`)
})