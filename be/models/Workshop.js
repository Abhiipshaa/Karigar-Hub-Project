const mongoose = require('mongoose');

const workshopSchema = new mongoose.Schema({
  title:           { type: String, required: true },
  description:     { type: String, required: true },
  date:            { type: String, required: true },
  fromTime:        { type: String, required: true },
  toTime:          { type: String, required: true },
  duration:        { type: String },
  zoomLink:        { type: String, default: '' },
  artistId:        { type: mongoose.Schema.Types.ObjectId, ref: 'Artist', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Workshop', workshopSchema);
