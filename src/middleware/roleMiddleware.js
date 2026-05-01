import District from '../models/District.js';

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Not authenticated' });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Role '${req.user.role}' is not permitted to perform this action`
      });
    }
    next();
  };
};

export const checkGeographicAccess = async (req, res, next) => {
  const user = req.user;

  if (user.role === 'central_admin') {
    return next();
  }

  if (user.role === 'provincial_admin') {
    if (!user.province) {
      return res.status(403).json({ success: false, message: 'No province assigned to your account' });
    }
    const districts = await District.find({ province: user.province._id }).select('_id');
    req.districtFilter = districts.map(d => d._id);
    return next();
  }

  if (user.role === 'police_station') {
    if (!user.district) {
      return res.status(403).json({ success: false, message: 'No district assigned to your account' });
    }
    req.districtFilter = [user.district._id];
    return next();
  }

  return next();
};
