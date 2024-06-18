const express = require('express');
const db = require('../services/contactsServices');
const router = express.Router();

// define API endpoints:
router.get('/contacts', db.getContacts);
router.get('/contacts/:id', db.getContactById);
router.post('/contacts', db.createContact);
router.put('/contacts/:id', db.updateContact);
router.delete('/contacts/:id', db.deleteContact);

module.exports = router;
