import mongoose from 'mongoose';

const districtSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  code: {
    type: String,
    required: true,
    unique: true
  },
  province: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Province',
    required: true
  },
  policeStations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PoliceStation'
  }]
}, {
  timestamps: true
});

export default mongoose.model('District', districtSchema);