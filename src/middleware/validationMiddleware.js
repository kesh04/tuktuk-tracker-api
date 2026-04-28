import { body, param, query, validationResult } from 'express-validator';

export const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(e => ({ field: e.path, message: e.msg }))
    });
  }
  next();
};

export const validateLogin = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
  handleValidation
];
 
export const validateRegister = [
  body('username').trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role')
    .isIn(['central_admin', 'provincial_admin', 'police_station', 'viewer'])
    .withMessage('Invalid role'),
  handleValidation
];

// ---- Vehicle Validators ----
export const validateVehicle = [
  body('registrationNumber').trim().notEmpty().withMessage('Registration number is required'),
  body('ownerName').trim().notEmpty().withMessage('Owner name is required'),
  body('ownerNic').trim().notEmpty().withMessage('Owner NIC is required'),
  body('deviceId').trim().notEmpty().withMessage('Device ID is required'),
  body('district').isMongoId().withMessage('Valid district ID is required'),
  handleValidation
];

export const validatePing = [
  body('deviceId').trim().notEmpty().withMessage('deviceId is required'),
  body('latitude').isFloat({ min: -90, max: 90 }).withMessage('Valid latitude is required'),
  body('longitude').isFloat({ min: -180, max: 180 }).withMessage('Valid longitude is required'),
  body('speed').optional().isFloat({ min: 0 }).withMessage('Speed must be a positive number'),
  body('heading').optional().isFloat({ min: 0, max: 359 }).withMessage('Heading must be 0-359'),
  handleValidation
];

// ---- Province/District/Station Validators ----
export const validateProvince = [
  body('name').trim().notEmpty().withMessage('Province name is required'),
  body('code').trim().notEmpty().withMessage('Province code is required'),
  handleValidation
];

export const validateDistrict = [
  body('name').trim().notEmpty().withMessage('District name is required'),
  body('code').trim().notEmpty().withMessage('District code is required'),
  body('province').isMongoId().withMessage('Valid province ID is required'),
  handleValidation
];

export const validatePoliceStation = [
  body('name').trim().notEmpty().withMessage('Station name is required'),
  body('code').trim().notEmpty().withMessage('Station code is required'),
  body('district').isMongoId().withMessage('Valid district ID is required'),
  body('location.coordinates').isArray({ min: 2, max: 2 }).withMessage('Coordinates [lng, lat] are required'),
  handleValidation
];

export const validateMongoId = (paramName = 'id') => [
  param(paramName).isMongoId().withMessage(`Invalid ${paramName}`),
  handleValidation
];
