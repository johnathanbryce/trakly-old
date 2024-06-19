const pool = require('../config/db');

const getUsers = (req, res) => {
    const query = `SELECT * FROM users ORDER BY user_id ASC`;
    pool.query(query, (error, results) => {
        if(error){
            res.status(500).send('Error fetching users')
        } 
        res.status(200).json(results.rows)
    })
}

const createUser = (req, res) => {
    const {name, email, position, company, created_at } = req.body;

    const query = `INSERT INTO users (name, email, position, company, created_at ) VALUES ($1, $2, $3, $4, $5) RETURNING user_id`;
    const values = [name, email, position || null, company || null, new Date()]

    pool.query(query, values, (error, results) => {
        if(error){
            res.status(500).send('Error creating user');
        } else {
            res.status(201).send(`User added with ID: ${results.rows[0].user_id}`)
        }
    });
}


module.exports = {
    getUsers,
    createUser
}