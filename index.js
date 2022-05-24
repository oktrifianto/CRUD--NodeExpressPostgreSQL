const express = require('express');
const app     = express();
const port    = 3000 || process.env.SERVER_PORT;
const lib     = require('./controllers/users.controllers');
app.use(express.json()); // enable `req.body`

app.get('/', (req, res) => {
  res.status(200).json({
    status  : res.statusCode,
    data    : "API using Node, Express, & Postgres"
  });
});

// Routes
app.get('/users', lib.getUsers);
app.get('/user/:id', lib.getUserById);
app.post('/user', lib.createUser);
app.delete('/user/:id', lib.deleteUser);
app.put('/user/:id', lib.updateUser);

app.listen(port, () => {
  console.log(`Your server running on port ${port}`);
});