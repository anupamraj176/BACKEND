const mongoose = require('mongoose');
require('dotenv').config();

exports.connectDB = () =>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(console.log("DB connected Successfully"))
    .catch((error) =>{
        console.log("DB connection issue")
        console.log(error)
        process.exit(1)
    })
}