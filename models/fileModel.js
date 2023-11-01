const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  file: { type: String, required: true },
  fileType: { type: String, required: true, unique: true },
  fileName: { type: String, required: true},
  fileExpiry: { type: Number, required: true, default:24},
  isGuestUser: { type: Boolean, default:false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('File', fileSchema);
