const express = require('express');
const app = express();

require('dotenv').config();
const Port = process.env.PORT || 3000;
const blogRoutes = require('./routes/blog');
// middleware
app.use(express.json()); // Moved to be after route mounting


// mount 

app.use('/api/V1', blogRoutes);



// connect to database
const connectWithDatabase = require('./config/database');
connectWithDatabase();

// start server
app.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);
});

// default route
app.get('/', (req, res) => {
    res.send('Welcome to the Blog API');
});