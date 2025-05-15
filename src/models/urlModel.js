const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  shortUrlId: { type: String, required: true, unique: true },
  longUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  visits: { type: Number, default: 0 }
});

module.exports = mongoose.model('Url', urlSchema);