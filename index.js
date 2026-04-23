import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/database.js';
dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({ message: 'TukTuk Tracker API running' });
});

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);

});