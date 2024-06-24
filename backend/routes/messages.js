const express = require('express');
const db = require('../services/messagesServices');
const router = express.Router();
// auth middleware
const authUser = require('../middleware/authUser')

// define API endpoints:
router.get('/messages', authUser, db.getMessages);
router.get('/messages/:id', authUser, db.getMessageById); 
router.post('/messages', authUser, db.createMessage); 
router.put('/messages/:id', authUser, db.updateMessage); 
router.delete('/messages/:id', authUser, db.deleteMessage); 

module.exports = router;