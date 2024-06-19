const express = require('express');
const db = require('../services/usersServices');
const router = express.Router();

// define API endpoints:
router.get('/users', db.getUsers);
//router.get('/users/:id', db.getContactById);
router.post('/users', db.createUser);
//router.put('/users/:id', db.updateContact);
//router.delete('/users/:id', db.deleteContact);

module.exports = router;
