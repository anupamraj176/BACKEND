const express = require('express');
const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.use(express.json());

require('./config/database').connectDB();

//route import kro or mount kro
const user = require('./route/user')
app.use('/api/v1',user);

app.listen(PORT , () => {
    console.log(`App is listening at port no ${PORT} successfully`)
})