const mongoose = require('mongoose');
require('dotenv').config();

exports.connectDB = () => {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("DB connected successfully"))
    .catch((err) => {
        console.log("Database facing connection issue");
        console.error(err);
        process.exit(1);
    });
};
