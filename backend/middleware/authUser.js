const pool = require('../config/db');

// this middleware sets req.user to user_id from our postgres db
// (every user in our db has a provider_id from clerk)
const authenticateUser = async (req, res, next) => {
  const providerId = req.headers['x-user-id']; // extract the provider ID from the custom header

  if (!providerId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // queries our db to grab the users "provider_id"
    const query = 'SELECT user_id FROM users WHERE provider_id = $1';
    const values = [providerId];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // attach user_id to the request object to verify CRUD operations in services (e.g.: contactsServices.js)
    req.user = { id: result.rows[0].user_id }; 
    next();
  } catch (error) {
    console.error('Error authenticating user:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = authenticateUser;