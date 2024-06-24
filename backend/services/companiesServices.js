const pool = require('../config/db');

const getCompanies = (req, res) => {
  // req.user.id is being set to "user_id" from our user in our database via middleware authUser.js 
  // (authUser.js is taking our provider_id and performing a query to our datbase to update req.user.id)
  const userId = req.user.id;

  const query = 'SELECT * FROM companies WHERE user_id = $1 ORDER BY company_id ASC';
  const values = [userId];

  const limit = parseInt(req.query.limit);

  pool.query(query, values, (error, results) => {
    if (error) {
      console.error('Error fetching companies:', error);
      return res.status(500).json({ msg: 'Error fetching companies. Please try again.' });
    }

    if (!isNaN(limit) && limit > 0) {
      return res.status(200).json(results.rows.slice(0, limit));
    }

    res.status(200).json(results.rows);
  });
};

const getCompanyById = (req, res) => {
    const id = parseInt(req.params.id);
  
    pool.query('SELECT * FROM companies WHERE company_id = $1', [id], (error, results) => {
      if (error) {
        console.error('Error fetching company:', error);
        return res.status(500).json({ msg: 'Error fetching company. Please try again.' });
      }
  
      if (results.rows.length === 0) {
        return res.status(404).json({ msg: 'Company not found' });
      }
  
      res.status(200).json(results.rows);
    });
};
  
const createCompany = (req, res) => {
    //const userId = req.user.id; //TODO: uncomment when done

      // Temporary hardcoded userId for testing purposes
  const userId = 8; // Replace with an appropriate test user ID

    const { name, industry, main_contact, email, phone, address, location_city, notes, website, linkedin, github, instagram, facebook, last_contacted_date, created_at, updated_at } = req.body;
  
    const query = `
      INSERT INTO companies 
      (user_id, name, industry, main_contact, email, phone, address, location_city, notes, website, linkedin, github, instagram, facebook, last_contacted_date, created_at, updated_at) 
      VALUES 
      ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) 
      RETURNING company_id
    `;
  
    const values = [
      userId, name, industry || null, main_contact || null, email || null, phone || null, address || null, location_city || null, notes || null, website || null, linkedin || null, github || null, instagram || null, facebook || null, last_contacted_date || null, created_at || new Date(), updated_at || new Date()
    ];
  
    pool.query(query, values, (error, results) => {
      if (error) {
        console.error('Error creating company:', error);
        return res.status(500).json({ msg: 'Error creating company' });
      }
      res.status(201).send(`Company added with ID: ${results.rows[0].company_id}`);
    });
};
  
const updateCompany = (req, res) => {
    const id = parseInt(req.params.id);
    const { name, industry, main_contact, email, phone, address, location_city, notes, website, linkedin, github, instagram, facebook, last_contacted_date, created_at, updated_at } = req.body;

    const query = `
        UPDATE companies 
        SET name = $1, industry = $2, main_contact = $3, email = $4, phone = $5, address = $6, location_city = $7, notes = $8, website = $9, linkedin = $10, github = $11, instagram = $12, facebook = $13, last_contacted_date = $14, created_at = $15, updated_at = $16
        WHERE company_id = $17 AND user_id = $18
    `;

    const values = [
        name, industry || null, main_contact || null, email || null, phone || null, address || null, location_city || null, notes || null, website || null, linkedin || null, github || null, instagram || null, facebook || null, last_contacted_date || null, created_at || new Date(), updated_at || new Date(), id, req.user.id
    ];

    pool.query(query, values, (error, results) => {
        if (error) {
        console.error('Error updating company:', error);
        return res.status(500).json({ msg: 'Error updating company' });
        }
        res.status(200).send(`Company modified with ID: ${id}`);
    });
};
  
const deleteCompany = (req, res) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    const id = parseInt(req.params.id);
  
    const query = 'DELETE FROM companies WHERE company_id = $1 AND user_id = $2';
    const values = [id, req.user.id];
  
    pool.query(query, values, (error, results) => {
      if (error) {
        console.error('Error deleting company:', error);
        return res.status(500).json({ msg: 'Error deleting company' });
      }
      res.status(200).send(`Company deleted with ID: ${id}`);
    });
};

module.exports = {
  getCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
};
