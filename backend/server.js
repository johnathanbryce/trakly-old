// entry point
require('dotenv').config();
const express = require("express");
const bodyParser = require('body-parser')
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 8080;
// routes import
const contactsRouter = require('./routes/contacts');

// middleware to parse JSON bodies
app.use(express.json()); // built-in body parser

// middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// cors
app.use(cors());

// API routes
app.use('/api', contactsRouter);

app.get('/', (req, res) => {
  res.json('hello world')
})


app.listen(PORT, () =>{
    console.log(`Server started on port ${PORT}`)
});





