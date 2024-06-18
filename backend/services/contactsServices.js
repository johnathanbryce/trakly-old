const pool = require('../config/db');

const getContacts = (req, res) => {
  const limit = parseInt(req.query.limit);
  pool.query('SELECT * FROM contacts ORDER BY id ASC', (error, results) => {
    if (error) {
      res.status(404).json({msg: `Error fetching users. Please try again.`})
      throw error
    } 

    console.log('getcontacts', results.rows)
    
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
  const { name, email, company, position, createdAt, links } = req.body;

  pool.query(
    'INSERT INTO contacts (name, email, company, position, created_at, links) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
    [name, email, company || null, position || null, createdAt || new Date(), links ? JSON.stringify(links) : null],
    (error, results) => {
      if (error) {
        console.error('Error inserting data:', error);
        res.status(500).send('Error creating contact');
      } else {
        res.status(201).send(`User added with ID: ${results.rows[0].id}`);
      }
    }
  );
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
