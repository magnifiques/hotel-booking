const mongoose = require("mongoose");
const User = require("../models/UserSchema");
const Reservation = require("../models/DateSchema");
var currentDate = "";

exports.getUsers = async (req, res, next) => {
  try {
    User.find({}, async (error, result) => {
      if (error) {
        return res.status(500).json({
          message: error.message,
        });
      }
      return await res.status(200).json({
        contents: result.map((user) => user.toObject({ getters: true })),
      });
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.addUsers = async (req, res, next) => {
  const { email, name, phone, rooms, checkIn, checkOut } = req.body;

  try {
    User.findOne({ email: email }, async (err, result) => {
      if (err) {
        return res.status(500).json({
          message: err.message,
        });
      }

      if (result !== null) {
        return res.status(409).json({
          message: "Can not be added! (email already exists)",
        });
      }

      try {
        const newUser = new User({
          _id: new mongoose.Types.ObjectId(),
          email,
          name,
          phone,
          rooms,
          checkIn,
          checkOut,
        });

        currentDate = new Date(checkIn);
        const currentMonth = currentDate.toLocaleString("default", {
          month: "long",
        });

        Reservation.findOne({ currentDate }, async (err, result) => {
          if (err) {
            return res.status(500).json({
              message: err.message,
            });
          }
          if (result !== null) {
            console.log(result);
            if (result.numOfBooking >= 5) {
              return res.status(409).json({
                message: `The booking for ${currentDate.getDate()} - ${currentMonth} has been sold out! Please select another date.`,
              });
            } else {
              Reservation.updateOne(
                { _id: result._id },
                {
                  $inc: {
                    numOfBooking: 1,
                  },
                },
                async (err, result) => {
                  if (err) {
                    return res.status(500).json({
                      message: err.message,
                    });
                  }
                }
              );
            }
          } else {
            const newReg = new Reservation({
              _id: new mongoose.Types.ObjectId(),
              reservationDate: currentDate,
              numOfBooking: 1,
            });
            await newReg.save();
          }
        });
        await newUser.save();

        return res.status(200).json({
          message: "Registered!",
        });
      } catch (err) {
        Reservation.findOne({ currentDate }, async (err, result) => {
          if (err) {
            return res.status(500).json({
              message: err.message,
            });
          }
          if (result !== null) {
            console.log(result);
            if (result.numOfBooking >= 5) {
              return res.status(409).json({
                message: "Sold Out!",
              });
            } else {
              Reservation.updateOne(
                { _id: result._id },
                {
                  $inc: {
                    numOfBooking: -1,
                  },
                },
                async (err, result) => {
                  if (err) {
                    return res.status(500).json({
                      message: err.message,
                    });
                  }
                }
              );
            }
          } else {
            const newReg = new Reservation({
              _id: new mongoose.Types.ObjectId(),
              reservationDate: currentDate,
              numOfBooking: 1,
            });
            await newReg.save();
          }
        });

        return res.status(500).json({
          message: err.message,
        });
      }
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
