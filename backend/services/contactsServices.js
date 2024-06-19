const pool = require('../config/db');

const getContacts = (req, res) => {
  const limit = parseInt(req.query.limit);
  pool.query('SELECT * FROM contacts ORDER BY contact_id ASC', (error, results) => {
    if (error) {
      res.status(404).json({msg: `Error fetching users. Please try again.`})
      throw error
    } 
    
    // if there is a limit in the req  (e.g: ?limit=2 in the url), limit the result res
    if (!isNaN(limit) && limit > 0) {
      return res.status(200).json(results.rows.slice(0, limit));
    }

    res.status(200).json(results.rows)
  })
}

const getContactById = (req, res) => {
  const id = parseInt(req.params.id)

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }

    if(results.rows.length === 0 || results.rows === null){
      return res.status(404).json({msg: `User not found`})
    }

    res.status(200).json(results.rows)
  })
}

const createContact = (req, res) => {
  const { user_id, first_name, last_name, email, phone, company, position, website, linkedin, github, instagram, notes, contact_method, last_contacted_date, created_at, updated_at } = req.body;

  const query = `
    INSERT INTO contacts 
    (user_id, first_name, last_name, email, phone, company, position, notes, contact_method, last_contacted_date, created_at, updated_at, website, linkedin, github, instagram) 
    VALUES 
    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) 
    RETURNING contact_id
  `;

  const values = [
    user_id, first_name, last_name, email, phone, company, position, notes || null, contact_method || null, last_contacted_date || null, created_at || new Date(), updated_at || new Date(), website || null, linkedin || null, github || null, instagram || null
  ];

  pool.query(query, values, (error, results) => {
    if (error) {
      console.error('Error inserting data:', error);
      res.status(500).send('Error creating contact');
    } else {
      res.status(201).send(`Contact added with ID: ${results.rows[0].contact_id}`);
    }
  });
};


const updateContact = (req, res) => {
  const id = parseInt(req.params.id)
  const { name, email } = req.body

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteContact = (req, res) => {
  const id = parseInt(req.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
}
