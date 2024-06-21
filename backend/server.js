// entry point
require('dotenv').config();
const express = require("express");
const bodyParser = require('body-parser')
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;

// routes import
const contactsRouter = require('./routes/contacts');
const usersRouter = require('./routes/users');


// middleware to parse JSON bodies
app.use(express.json()); // built-in body parser

// middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// cors
app.use(cors());

// API routes
app.use('/api', contactsRouter);
app.use('/api', usersRouter);

app.get('/', (req, res) => {
  res.json('hello world')
})

app.listen(PORT, () =>{
    console.log(`Server started on port ${PORT}`)
});





