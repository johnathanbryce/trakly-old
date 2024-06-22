const express = require('express');
const db = require('../services/contactsServices');
const router = express.Router();
// auth middleware
const authUser = require('../middleware/authUser')

// define API endpoints:
router.get('/contacts', authUser, db.getContacts);
router.get('/contacts/:id', authUser, db.getContactById); 
router.post('/contacts', authUser, db.createContact); 
router.put('/contacts/:id', authUser, db.updateContact); 
router.delete('/contacts/:id', authUser, db.deleteContact); 


module.exports = router;
