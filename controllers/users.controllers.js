const pool = require('../db/database');

// Get all users
const getUsers = (req, res) => {
  pool.query('SELECT * FROM users', (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json(results.rows);
  })
};

// Get single user
const getUserById = (req, res) => {
  const { id } = req.params;
  pool.query(`SELECT * FROM users WHERE id = ${id}`, (err, results) => {
    if (err) throw err;
    if (results.rows.length > 0) {
      res.status(200).json(results.rows);
    } else {
      res.status(404).json({
        status : res.statusCode,
        message: 'User not found.'
      });
    }
  });
}

module.exports = {
  getUsers,
  getUserById
};