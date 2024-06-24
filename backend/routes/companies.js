const express = require('express');
const db = require('../services/companiesServices');
const router = express.Router();
// auth middleware
const authUser = require('../middleware/authUser')

// define API endpoints:
router.get('/companies', authUser, db.getCompanies);
router.get('/companies/:id', authUser, db.getCompanyById); 
router.post('/companies', authUser, db.createCompany); 
router.put('/companies/:id', authUser, db.updateCompany); 
router.delete('/companies/:id', authUser, db.deleteCompany); 

module.exports = router;