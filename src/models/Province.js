import mongoose from 'mongoose';

const provinceSchema = new mongoose.Schema(
  {
  name: {
    type: String,
    required: [true, 'Province name is required'],
    unique: true,
    trim: true
  },
  code: {
    type: String,
    required: [true, 'Province code is required'],
    unique: true,
    uppercase: true,
    trim: true
  },
  districts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'District'
  }]
}, { timestamps: true });

export default mongoose.model('Province', provinceSchema);