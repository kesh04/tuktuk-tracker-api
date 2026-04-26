import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/database.js';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

dotenv.config();

connectDB();

import authRoutes from './src/routes/authRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;


app.use(helmet());
app.use(cors());
app.use(express.json());


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100,
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api', limiter);


app.get('/', (req, res) => {
  res.json({ message: 'TukTuk Tracker API running' });
});


app.use('/api/auth', authRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false,
    error: 'Something went wrong!' 
  });
});


app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);

});