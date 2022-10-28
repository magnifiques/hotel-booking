const mongoose = require("mongoose");

const dateSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  reservationDate: {
    type: Date,
    required: true,
    unique: true,
  },
  numOfBooking: {
    type: Number,
    required: true,
    maximum: 5,
  },
});

module.exports = mongoose.model("Reservation", dateSchema);
