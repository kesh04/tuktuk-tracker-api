import express from 'express';
import {
  getVehicles, getVehicle, createVehicle, updateVehicle, deleteVehicle,
  getVehicleLastLocation, getVehicleHistory, submitLocationPing
} from '../controllers/vehicleController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize, checkGeographicAccess } from '../middleware/roleMiddleware.js';
import { validateVehicle, validatePing, validateMongoId } from '../middleware/validationMiddleware.js';

const router = express.Router();

router.post('/ping', validatePing, submitLocationPing);

router.use(protect);

router.get('/',       checkGeographicAccess, getVehicles);
router.get('/:id',    validateMongoId('id'), getVehicle);
router.get('/:id/location', validateMongoId('id'), getVehicleLastLocation);
router.get('/:id/history',  validateMongoId('id'), getVehicleHistory);

router.post('/',      authorize('central_admin', 'provincial_admin'), validateVehicle, createVehicle);
router.put('/:id',    authorize('central_admin', 'provincial_admin'), validateMongoId('id'), updateVehicle);
router.delete('/:id', authorize('central_admin'), validateMongoId('id'), deleteVehicle);

export default router;
