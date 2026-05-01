import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
  registrationNumber: {
    type: String,
    required: [true, 'Registration number is required'],
    unique: true,
    uppercase: true,
    trim: true
  },
  ownerName: {
    type: String,
    required: [true, 'Owner name is required'],
    trim: true
  },
  ownerNic: {
    type: String,
    required: [true, 'Owner NIC is required'],
    unique: true,
    trim: true
  },
  ownerPhone: {
    type: String,
    trim: true
  },
  deviceId: {
    type: String,
    required: [true, 'Device ID is required'],
    unique: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended'],
    default: 'active'
  },
  district: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'District',
    required: [true, 'District is required']
  },
  policeStation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PoliceStation'
  },
  lastLocation: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number], 
      default: [0, 0]
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }
}, { timestamps: true });

vehicleSchema.index({ lastLocation: '2dsphere' });
vehicleSchema.index({ district: 1, status: 1 });

export default mongoose.model('Vehicle', vehicleSchema);