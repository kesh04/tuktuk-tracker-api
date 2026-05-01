import express from 'express';
import {
  getPoliceStations, getPoliceStation,
  createPoliceStation, updatePoliceStation, deletePoliceStation
} from '../controllers/policeStationController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize, checkGeographicAccess } from '../middleware/roleMiddleware.js';
import { validatePoliceStation, validateMongoId } from '../middleware/validationMiddleware.js';

const router = express.Router();

router.use(protect);

router.get('/',      checkGeographicAccess, getPoliceStations);
router.get('/:id',   validateMongoId('id'), getPoliceStation);

router.post('/',     authorize('central_admin', 'provincial_admin'), validatePoliceStation, createPoliceStation);
router.put('/:id',   authorize('central_admin', 'provincial_admin'), validateMongoId('id'), updatePoliceStation);
router.delete('/:id',authorize('central_admin'), validateMongoId('id'), deletePoliceStation);

export default router;
