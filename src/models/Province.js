import mongoose from 'mongoose';

const provinceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true
    },
    districts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'District'
      }
    ]
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Province', provinceSchema);