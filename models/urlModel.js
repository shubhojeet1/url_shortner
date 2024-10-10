const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  longUrl: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function (v) {
        const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
        return urlRegex.test(v);
      },
      message: 'Invalid URL format',
    },
  },
  shortUrlCode: {
    type: String,
    required: true,
    unique: true,
  },
  expirationDate: Date,
  clicks: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Url', urlSchema);
