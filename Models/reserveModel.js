const mongoose = require('mongoose');

const reserveSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  selectedDay: {
    type: String,
    required: true,
  },
  selectedTime: {
    type: String,
    required: true,
  },
});

const Reserve = mongoose.model('Reserve', reserveSchema);

module.exports = Reserve;
