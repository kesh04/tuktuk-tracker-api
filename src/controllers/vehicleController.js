import Vehicle from '../models/Vehicle.js';
import LocationPing from '../models/LocationPing.js';
import { successResponse, errorResponse, getPaginationMeta } from '../utils/helpers.js';

export const getVehicles = async (req, res) => {
  try {
    const { status, district, registrationNumber, page = 1, limit = 20 } = req.query;
    const filter = {};

    if (status)               filter.status = status;
    if (registrationNumber)   filter.registrationNumber = { $regex: registrationNumber, $options: 'i' };

    if (req.districtFilter)   filter.district = { $in: req.districtFilter };
    else if (district)        filter.district = district;

    const skip  = (page - 1) * limit;
    const total = await Vehicle.countDocuments(filter);
    const data  = await Vehicle.find(filter)
      .populate('district', 'name code')
      .populate('policeStation', 'name code')
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    return successResponse(res, data, 200, getPaginationMeta(total, page, limit));
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};


export const getVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id)
      .populate('district', 'name code')
      .populate('policeStation', 'name code');
    if (!vehicle) return errorResponse(res, 'Vehicle not found', 404);
    return successResponse(res, vehicle);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};


export const createVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.create(req.body);
    return successResponse(res, vehicle, 201);
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};

export const updateVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate('district', 'name code').populate('policeStation', 'name code');
    if (!vehicle) return errorResponse(res, 'Vehicle not found', 404);
    return successResponse(res, vehicle);
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};


export const deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
    if (!vehicle) return errorResponse(res, 'Vehicle not found', 404);
    return successResponse(res, { message: 'Vehicle deleted successfully' });
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

export const getVehicleLastLocation = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id)
      .select('registrationNumber ownerName deviceId lastLocation status');
    if (!vehicle) return errorResponse(res, 'Vehicle not found', 404);
    return successResponse(res, vehicle);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

export const getVehicleHistory = async (req, res) => {
  try {
    const { from, to, limit = 100, page = 1 } = req.query;
    const filter = { vehicle: req.params.id };

    if (from || to) {
      filter.timestamp = {};
      if (from) filter.timestamp.$gte = new Date(from);
      if (to)   filter.timestamp.$lte = new Date(to);
    }

    const skip  = (page - 1) * limit;
    const total = await LocationPing.countDocuments(filter);
    const data  = await LocationPing.find(filter)
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(Number(limit));

    return successResponse(res, data, 200, getPaginationMeta(total, page, limit));
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

export const submitLocationPing = async (req, res) => {
  try {
    const { deviceId, latitude, longitude, speed, heading, accuracy } = req.body;

    const vehicle = await Vehicle.findOne({ deviceId });
    if (!vehicle) return errorResponse(res, 'Device not registered in the system', 404);
    if (vehicle.status !== 'active') return errorResponse(res, 'Vehicle is not active', 403);

    const ping = await LocationPing.create({
      vehicle:   vehicle._id,
      location:  { type: 'Point', coordinates: [parseFloat(longitude), parseFloat(latitude)] },
      speed:     speed    || 0,
      heading:   heading  || 0,
      accuracy:  accuracy || 10,
      timestamp: new Date()
    });

    vehicle.lastLocation = {
      type: 'Point',
      coordinates: [parseFloat(longitude), parseFloat(latitude)],
      timestamp:   new Date()
    };
    await vehicle.save();

    return successResponse(res, ping, 201);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};
