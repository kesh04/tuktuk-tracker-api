import mongoose from 'mongoose';

const policeStationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Police station name is required'],
    trim: true
  },
  code: {
    type: String,
    required: [true, 'Station code is required'],
    unique: true,
    uppercase: true,
    trim: true
  },
  district: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'District',
    required: [true, 'District is required']
  },
  address: {
    type: String,
    trim: true
  },
  contactNumber: {
    type: String,
    trim: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number], 
      required: [true, 'Coordinates are required']
    }
  }
}, { timestamps: true });

policeStationSchema.index({ location: '2dsphere' });

export default mongoose.model('PoliceStation', policeStationSchema);