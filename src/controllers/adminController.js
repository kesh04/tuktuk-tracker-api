import Province from '../models/Province.js';
import District from '../models/District.js';
import { successResponse, errorResponse, getPaginationMeta } from '../utils/helpers.js';

export const getProvinces = async (req, res) => {
  try {
    const provinces = await Province.find().populate('districts', 'name code').sort({ name: 1 });
    return successResponse(res, provinces, 200, { count: provinces.length });
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

export const getProvince = async (req, res) => {
  try {
    const province = await Province.findById(req.params.id).populate('districts', 'name code');
    if (!province) return errorResponse(res, 'Province not found', 404);
    return successResponse(res, province);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

export const createProvince = async (req, res) => {
  try {
    const province = await Province.create(req.body);
    return successResponse(res, province, 201);
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};

export const updateProvince = async (req, res) => {
  try {
    const province = await Province.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!province) return errorResponse(res, 'Province not found', 404);
    return successResponse(res, province);
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};


export const deleteProvince = async (req, res) => {
  try {
    const province = await Province.findByIdAndDelete(req.params.id);
    if (!province) return errorResponse(res, 'Province not found', 404);
    return successResponse(res, { message: 'Province deleted successfully' });
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};


export const getDistricts = async (req, res) => {
  try {
    const { province, page = 1, limit = 30 } = req.query;
    const filter = {};
    if (province)            filter.province = province;
    if (req.provinceFilter)  filter.province = req.provinceFilter;

    const skip  = (page - 1) * limit;
    const total = await District.countDocuments(filter);
    const data  = await District.find(filter)
      .populate('province', 'name code')
      .populate('policeStations', 'name code')
      .skip(skip)
      .limit(Number(limit))
      .sort({ name: 1 });

    return successResponse(res, data, 200, getPaginationMeta(total, page, limit));
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};


export const getDistrict = async (req, res) => {
  try {
    const district = await District.findById(req.params.id)
      .populate('province', 'name code')
      .populate('policeStations', 'name code');
    if (!district) return errorResponse(res, 'District not found', 404);
    return successResponse(res, district);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};


export const createDistrict = async (req, res) => {
  try {
    const district = await District.create(req.body);
    await Province.findByIdAndUpdate(district.province, { $push: { districts: district._id } });
    return successResponse(res, district, 201);
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};


export const updateDistrict = async (req, res) => {
  try {
    const district = await District.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!district) return errorResponse(res, 'District not found', 404);
    return successResponse(res, district);
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};


export const deleteDistrict = async (req, res) => {
  try {
    const district = await District.findByIdAndDelete(req.params.id);
    if (!district) return errorResponse(res, 'District not found', 404);
    return successResponse(res, { message: 'District deleted successfully' });
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};
