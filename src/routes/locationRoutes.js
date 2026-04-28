import express from 'express';
import { getLiveLocations, getLocationHistory, getLocationStats } from '../controllers/locationController.js';
import { protect } from '../middleware/authMiddleware.js';
import { checkGeographicAccess } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.use(protect);

router.get('/live',    checkGeographicAccess, getLiveLocations);
router.get('/history', checkGeographicAccess, getLocationHistory);
router.get('/stats',   checkGeographicAccess, getLocationStats);

export default router;
