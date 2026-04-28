import mongoose from 'mongoose';

const districtSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'District name is required'],
    trim: true
  },
  code: {
    type: String,
    required: [true, 'District code is required'],
    unique: true,
    uppercase: true,
    trim: true
  },
  province: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Province',
    required: [true, 'Province is required']
  },
  policeStations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PoliceStation'
  }]
}, {
  timestamps: true
});

export default mongoose.model('District', districtSchema);