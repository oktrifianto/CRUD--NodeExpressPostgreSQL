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

// Create new user 
// @see https://stackoverflow.com/questions/37243698/how-can-i-find-the-last-insert-id-with-node-js-and-postgresql
const createUser = (req, res) => {
  const { name, email } = req.body;
  pool.query(`INSERT INTO users (name, email) VALUES ('${name}', '${email}') RETURNING id`, (err, results) => {
    if (err) throw err;
    res.status(201).json({
      status: res.statusCode,
      message : `New user added with ID: ${results.rows[0].id}`
    });
  });
}

// Delete one user
const deleteUser  = (req, res) => {
  const { id } = req.params;
  pool.query(`DELETE FROM users WHERE id = ${id}`, (err, results) => {
    if (err) throw err;
    res.status(200).json({
      message : `User with ID ${id} has been deleted.`
    });
  });
}

// Update user
const updateUser = (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  pool.query(`UPDATE users SET name='${name}', email='${email}' WHERE id = ${id}`, (err, results) => {
    if (err) throw err;
    res.status(200).json({
      message: 'User successfully updated.'
    });
  });
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser
};