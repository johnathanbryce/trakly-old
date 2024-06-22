const pool = require('../config/db');


const getContacts = (req, res) => {
  // req.user.id is being set to "user_id" from our user in our database via middleware authUser.js 
  // (authUser.js is taking our provider_id and performing a query to our datbase to update req.user.id)
  const userId = req.user.id;

  const query = 'SELECT * FROM contacts WHERE user_id = $1 ORDER BY contact_id ASC';
  const values = [userId];

  const limit = parseInt(req.query.limit);

  pool.query(query, values, (error, results) => {
    if (error) {
      console.error('Error fetching contacts:', error);
      return res.status(500).json({ msg: 'Error fetching contacts. Please try again.' });
    }

    if (!isNaN(limit) && limit > 0) {
      return res.status(200).json(results.rows.slice(0, limit));
    }

    res.status(200).json(results.rows);
  });
};

const getContactById = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query('SELECT * FROM contacts WHERE contact_id = $1', [id], (error, results) => {
    if (error) {
      console.error('Error fetching contact:', error);
      return res.status(500).json({ msg: 'Error fetching contact. Please try again.' });
    }

    if (results.rows.length === 0) {
      return res.status(404).json({ msg: 'Contact not found' });
    }

    res.status(200).json(results.rows);
  });
};

const createContact = (req, res) => {
  const userId = req.user.id;
  const { first_name, last_name, email, phone, company, position, website, linkedin, github, instagram, notes, contact_method, last_contacted_date, created_at, updated_at } = req.body;

  const query = `
    INSERT INTO contacts 
    (user_id, first_name, last_name, email, phone, company, position, notes, contact_method, last_contacted_date, created_at, updated_at, website, linkedin, github, instagram) 
    VALUES 
    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) 
    RETURNING contact_id
  `;

  const values = [
    userId, first_name, last_name, email, phone, company, position, notes || null, contact_method || null, last_contacted_date || null, created_at || new Date(), updated_at || new Date(), website || null, linkedin || null, github || null, instagram || null
  ];

  pool.query(query, values, (error, results) => {
    if (error) {
      console.error('Error creating contact:', error);
      return res.status(500).json({ msg: 'Error creating contact' });
    }
    res.status(201).send(`Contact added with ID: ${results.rows[0].contact_id}`);
  });
};

const updateContact = (req, res) => {
  const id = parseInt(req.params.id);
  const { first_name, last_name, email, phone, company, position, website, linkedin, github, instagram, notes, contact_method, last_contacted_date, created_at, updated_at } = req.body;

  const query = `
    UPDATE contacts 
    SET first_name = $1, last_name = $2, email = $3, phone = $4, company = $5, position = $6, website = $7, linkedin = $8, github = $9, instagram = $10, notes = $11, contact_method = $12, last_contacted_date = $13, created_at = $14, updated_at = $15
    WHERE contact_id = $16 AND user_id = $17
  `;

  const values = [
    first_name, last_name, email, phone, company, position, website, linkedin, github, instagram, notes || null, contact_method || null, last_contacted_date || null, created_at || new Date(), updated_at || new Date(), id, req.user.id
  ];

  pool.query(query, values, (error, results) => {
    if (error) {
      console.error('Error updating contact:', error);
      return res.status(500).json({ msg: 'Error updating contact' });
    }
    res.status(200).send(`Contact modified with ID: ${id}`);
  });
};

const deleteContact = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const id = parseInt(req.params.id);

  const query = 'DELETE FROM contacts WHERE contact_id = $1 AND user_id = $2';
  const values = [id, req.user.id];

  pool.query(query, values, (error, results) => {
    if (error) {
      console.error('Error deleting contact:', error);
      return res.status(500).json({ msg: 'Error deleting contact' });
    }
    res.status(200).send(`Contact deleted with ID: ${id}`);
  });
};

module.exports = {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};
