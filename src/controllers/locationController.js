import LocationPing from '../models/LocationPing.js';
import Vehicle from '../models/Vehicle.js';
import { successResponse, errorResponse, getPaginationMeta } from '../utils/helpers.js';

export const getLiveLocations = async (req, res) => {
  try {
    const { district } = req.query;
    const filter = { status: 'active' };

    if (req.districtFilter)  filter.district = { $in: req.districtFilter };
    else if (district)       filter.district = district;

    const vehicles = await Vehicle.find(filter)
      .select('registrationNumber ownerName ownerPhone deviceId lastLocation status district policeStation')
      .populate('district', 'name code')
      .populate('policeStation', 'name code')
      .sort({ 'lastLocation.timestamp': -1 });

    return successResponse(res, vehicles, 200, { count: vehicles.length });
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};


export const getLocationHistory = async (req, res) => {
  try {
    const { vehicleId, district, from, to, page = 1, limit = 50 } = req.query;
    const filter = {};

    if (vehicleId) filter.vehicle = vehicleId;

    if (from || to) {
      filter.timestamp = {};
      if (from) filter.timestamp.$gte = new Date(from);
      if (to)   filter.timestamp.$lte = new Date(to);
    }

    if (req.districtFilter || district) {
      const distIds   = req.districtFilter || [district];
      const vehicles  = await Vehicle.find({ district: { $in: distIds } }).select('_id');
      const vehicleIds = vehicles.map(v => v._id);
      filter.vehicle  = vehicleId ? filter.vehicle : { $in: vehicleIds };
    }

    const skip  = (page - 1) * limit;
    const total = await LocationPing.countDocuments(filter);
    const data  = await LocationPing.find(filter)
      .populate('vehicle', 'registrationNumber ownerName deviceId')
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(Number(limit));

    return successResponse(res, data, 200, getPaginationMeta(total, page, limit));
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};


export const getLocationStats = async (req, res) => {
  try {
    const now       = new Date();
    const dayAgo    = new Date(now - 24 * 60 * 60 * 1000);
    const weekAgo   = new Date(now - 7  * 24 * 60 * 60 * 1000);

    const distFilter = req.districtFilter ? { district: { $in: req.districtFilter } } : {};

    const [totalVehicles, activeVehicles, inactiveVehicles, suspendedVehicles,
           pingsToday, pingsWeek, totalPings] = await Promise.all([
      Vehicle.countDocuments(distFilter),
      Vehicle.countDocuments({ ...distFilter, status: 'active' }),
      Vehicle.countDocuments({ ...distFilter, status: 'inactive' }),
      Vehicle.countDocuments({ ...distFilter, status: 'suspended' }),
      LocationPing.countDocuments({ timestamp: { $gte: dayAgo } }),
      LocationPing.countDocuments({ timestamp: { $gte: weekAgo } }),
      LocationPing.countDocuments()
    ]);

    return successResponse(res, {
      vehicles: { total: totalVehicles, active: activeVehicles, inactive: inactiveVehicles, suspended: suspendedVehicles },
      pings:    { total: totalPings, last24Hours: pingsToday, lastWeek: pingsWeek }
    });
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};
