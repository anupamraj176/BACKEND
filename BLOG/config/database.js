const mongoose = require('mongoose');

require('dotenv').config();

const connectWithDatabaae = () => {
    mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
        console.log('Connected to database successfully');
    })
    .catch((err) => {
        console.log("Db facing connecting issue");
        console.error('Error connecting to database:', err);
        process.exit(1); // Exit the process with failure
    });
}

module.exports = connectWithDatabaae;