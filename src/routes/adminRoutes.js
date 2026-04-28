import express from 'express';
import {
  getProvinces, getProvince, createProvince, updateProvince, deleteProvince,
  getDistricts, getDistrict, createDistrict, updateDistrict, deleteDistrict
} from '../controllers/adminController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize, checkGeographicAccess } from '../middleware/roleMiddleware.js';
import { validateProvince, validateDistrict, validateMongoId } from '../middleware/validationMiddleware.js';

const router = express.Router();

router.use(protect);

router.get('/provinces',        getProvinces);
router.get('/provinces/:id',    validateMongoId('id'), getProvince);
router.post('/provinces',       authorize('central_admin'), validateProvince, createProvince);
router.put('/provinces/:id',    authorize('central_admin'), validateMongoId('id'), updateProvince);
router.delete('/provinces/:id', authorize('central_admin'), validateMongoId('id'), deleteProvince);

router.get('/districts',        checkGeographicAccess, getDistricts);
router.get('/districts/:id',    validateMongoId('id'), getDistrict);
router.post('/districts',       authorize('central_admin'), validateDistrict, createDistrict);
router.put('/districts/:id',    authorize('central_admin'), validateMongoId('id'), updateDistrict);
router.delete('/districts/:id', authorize('central_admin'), validateMongoId('id'), deleteDistrict);

export default router;
