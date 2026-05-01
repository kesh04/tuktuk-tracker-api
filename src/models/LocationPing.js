import mongoose from 'mongoose';

const locationPingSchema = new mongoose.Schema({
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: [true, 'Vehicle is required'],
    index: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
      default: 'Point'
    },
    coordinates: {
      type: [Number], 
      required: [true, 'Coordinates are required']
    }
  },
  speed: {
    type: Number,
    default: 0,
    min: 0
  },
  heading: {
    type: Number,
    default: 0,
    min: 0,
    max: 359
  },
  accuracy: {
    type: Number,
    default: 10
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  }
}, { timestamps: true });

locationPingSchema.index({ location: '2dsphere' });
locationPingSchema.index({ vehicle: 1, timestamp: -1 });
locationPingSchema.index({ timestamp: -1 });

export default mongoose.model('LocationPing', locationPingSchema);
