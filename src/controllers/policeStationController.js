import PoliceStation from '../models/PoliceStation.js';
import District from '../models/District.js';
import { successResponse, errorResponse, getPaginationMeta } from '../utils/helpers.js';

export const getPoliceStations = async (req, res) => {
  try {
    const { district, page = 1, limit = 50 } = req.query;
    const filter = {};

    if (req.districtFilter)  filter.district = { $in: req.districtFilter };
    else if (district)       filter.district = district;

    const skip  = (page - 1) * limit;
    const total = await PoliceStation.countDocuments(filter);
    const data  = await PoliceStation.find(filter)
      .populate('district', 'name code')
      .skip(skip)
      .limit(Number(limit))
      .sort({ name: 1 });

    return successResponse(res, data, 200, getPaginationMeta(total, page, limit));
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

export const getPoliceStation = async (req, res) => {
  try {
    const station = await PoliceStation.findById(req.params.id).populate('district', 'name code');
    if (!station) return errorResponse(res, 'Police station not found', 404);
    return successResponse(res, station);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

export const createPoliceStation = async (req, res) => {
  try {
    const station = await PoliceStation.create(req.body);
    await District.findByIdAndUpdate(station.district, { $push: { policeStations: station._id } });
    return successResponse(res, station, 201);
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};

export const updatePoliceStation = async (req, res) => {
  try {
    const station = await PoliceStation.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true
    }).populate('district', 'name code');
    if (!station) return errorResponse(res, 'Police station not found', 404);
    return successResponse(res, station);
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};

export const deletePoliceStation = async (req, res) => {
  try {
    const station = await PoliceStation.findByIdAndDelete(req.params.id);
    if (!station) return errorResponse(res, 'Police station not found', 404);
    return successResponse(res, { message: 'Police station deleted successfully' });
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};
