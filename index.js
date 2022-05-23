const express = require('express');
const app     = express();
const port    = 3000;

app.get('/', (req, res) => {
  res.status(200).json({
    status  : res.statusCode,
    data    : "API using Node, Express, & Postgres"
  });
});

app.listen(port, () => {
  console.log(`Your server running on port ${port}`);
});