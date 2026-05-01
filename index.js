import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/database.js';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { setupSwagger } from './src/config/swagger.js';


dotenv.config();

connectDB();

import authRoutes from './src/routes/authRoutes.js';
import adminRoutes from './src/routes/adminRoutes.js';
import vehicleRoutes from './src/routes/vehicleRoutes.js';
import  policeStationRoutes from "./src/routes/policeStationRoutes.js"
import locationRoutes     from './src/routes/locationRoutes.js';
const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
  crossOriginOpenerPolicy: false
}));
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



setupSwagger(app);


app.get('/', (req, res) => {
  res.json({ message: 'TukTuk Tracker API running' });
});


app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/policestations', policeStationRoutes);
app.use('/api/locations',       locationRoutes);



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