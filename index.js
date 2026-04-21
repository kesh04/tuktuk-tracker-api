const express = require('express');
const app = express();
const port = 5000;

app.get('/', (req, res) => {
  res.json({ message: 'TukTuk Tracker API running' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});