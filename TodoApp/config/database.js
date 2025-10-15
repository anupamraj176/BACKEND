const mongoose = require('mongoose');
require('dotenv').config();

const dbConnect = () => {
  mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log("DB connected successfully"))
    .catch((error) => {
      console.log("Error found while connecting to DB");
      console.error(error);
    });
};

module.exports = dbConnect;
