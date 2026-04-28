import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/database.js';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';


dotenv.config();

connectDB();


import './src/models/Province.js';
import './src/models/District.js';
import './src/models/PoliceStation.js';
import './src/models/Vehicle.js';
import './src/models/LocationPing.js';
import './src/models/User.js';

import authRoutes from './src/routes/authRoutes.js';
import adminRoutes from './src/routes/adminRoutes.js';
import vehicleRoutes from './src/routes/vehicleRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;


app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));


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
app.use('/api/admin', adminRoutes);
app.use('/api/vehicles', vehicleRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
})

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