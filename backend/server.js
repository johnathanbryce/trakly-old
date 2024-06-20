// entry point
require('dotenv').config();
const express = require("express");
const bodyParser = require('body-parser')
const cors = require("cors");
// Clerk / Auth
const { requireSession } = require('@clerk/clerk-sdk-node');
const { ClerkExpressWithAuth } = require('@clerk/clerk-sdk-node/express')

const app = express();
const PORT = process.env.PORT || 8080;

// routes import
const contactsRouter = require('./routes/contacts');
const usersRouter = require('./routes/users');

// Use Clerk middleware
app.use(ClerkExpressWithAuth({
  apiKey: process.env.CLERK_API_KEY
}));

// Example protected route
app.get('/protected', requireSession, (req, res) => {
  const userId = req.auth.userId;
  res.send(`Hello, user ${userId}`);
});

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





