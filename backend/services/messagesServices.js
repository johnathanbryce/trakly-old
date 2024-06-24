const pool = require('../config/db');

const getMessages = (req, res) => {
  // req.user.id is being set to "user_id" from our user in our database via middleware authUser.js 
  // (authUser.js is taking our provider_id and performing a query to our datbase to update req.user.id)
  const userId = req.user.id;

  const query = 'SELECT * FROM message_templates WHERE user_id = $1 ORDER BY template_id ASC';
  const values = [userId];

  const limit = parseInt(req.query.limit);

  pool.query(query, values, (error, results) => {
    if (error) {
      console.error('Error fetching messages:', error);
      return res.status(500).json({ msg: 'Error fetching messages. Please try again.' });
    }

    if (!isNaN(limit) && limit > 0) {
      return res.status(200).json(results.rows.slice(0, limit));
    }

    res.status(200).json(results.rows);
  });
};

const getMessageById = (req, res) => {
    const id = parseInt(req.params.id);
  
    pool.query('SELECT * FROM message_templates WHERE template_id = $1', [id], (error, results) => {
      if (error) {
        console.error('Error fetching message:', error);
        return res.status(500).json({ msg: 'Error fetching message. Please try again.' });
      }
  
      if (results.rows.length === 0) {
        return res.status(404).json({ msg: 'Message not found' });
      }
  
      res.status(200).json(results.rows);
    });
};

const createMessage = (req, res) => {
    const userId = req.user.id; 

    const { title, message, target_audience, created_at, updated_at } = req.body;
  
    const query = `
      INSERT INTO message_templates 
      (user_id, title, message, target_audience, created_at, updated_at) 
      VALUES 
      ($1, $2, $3, $4, $5, $6) 
      RETURNING template_id
    `;
  
    const values = [
      userId, title, message, target_audience || null, created_at || new Date(), updated_at || new Date()
    ];
  
    pool.query(query, values, (error, results) => {
      if (error) {
        console.error('Error creating message:', error);
        return res.status(500).json({ msg: 'Error creating message' });
      }
      res.status(201).send(`Message added with ID: ${results.rows[0].template_id}`);
    });
};
  
const updateMessage = (req, res) => {
    const id = parseInt(req.params.id);
    const { title, message, target_audience, created_at, updated_at } = req.body;
  
    const query = `
      UPDATE message_templates 
      SET title = $1, message = $2, target_audience = $3, created_at = $4, updated_at = $5
      WHERE template_id = $6 AND user_id = $7
    `;
  
    const values = [
      title, message, target_audience || null, created_at || new Date(), updated_at || new Date(), id, req.user.id
    ];
  
    pool.query(query, values, (error, results) => {
      if (error) {
        console.error('Error updating message:', error);
        return res.status(500).json({ msg: 'Error updating message' });
      }
      res.status(200).send(`Message modified with ID: ${id}`);
    });
};
  
const deleteMessage = (req, res) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    const id = parseInt(req.params.id);
  
    const query = 'DELETE FROM message_templates WHERE template_id = $1 AND user_id = $2';
    const values = [id, req.user.id];
  
    pool.query(query, values, (error, results) => {
      if (error) {
        console.error('Error deleting message:', error);
        return res.status(500).json({ msg: 'Error deleting message' });
      }
      res.status(200).send(`Message deleted with ID: ${id}`);
    });
};

module.exports = {
  getMessages,
  getMessageById,
  createMessage,
  updateMessage,
  deleteMessage,
};