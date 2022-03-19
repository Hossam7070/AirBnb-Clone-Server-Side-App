const Booking = require("../Models/bookingModel");

exports.createBooking = async (req, res, next) => {
  const { property,host, guest, checkOut } = req.body;
  try {
    const booking = new Booking({
      property,
      host,
      guest,
      checkOut,
    });
    const newBooking = await booking.save();
    res.json(newBooking);
  } catch (err) {
    next(err);
  }
};
exports.getAllBooknings = async (req, res, next) => {
  try {
    const bookings = await Booking.find();
    res.send(bookings);
  } catch (err) {
    next(err);
  }
};
exports.getBookningsByHost = async (req, res, next) => {
  const { id } = req.params;
  try {
    const myBookings = await Booking.find({host: id });
    res.send(myBookings);
  } catch (err) {
    next(err);
  }
};
exports.getBookningsByProp = async (req, res, next) => {
  const { id } = req.params;
  try {
    const myBookings = await Booking.find({ property: id });
  } catch (err) {
    next(err);
  }
};
exports.getMyCurruntBookings = async (req, res, next) => {
  const { id } = req.params;
  const now = new Date(Date.now());
  const today = now.getDate();
  const tomorrow = new Date();
  tomorrow.setDate(today+1)
  const nextWeek = new Date();
  nextWeek.setDate(today+7)
    console.log(today,tomorrow,nextWeek)
try {
    const data = {}
    data.todaysBookings = await Booking.find(
        {
            host: id,checkOut:{$gte: now},checkIn:{$lt: now}
        }
    );
    data.tomorrowsBookings = await Booking.find(
        {
            host: id,checkOut:{$gte: tomorrow},checkIn:{$lt: tomorrow}
        }
    );
    data.nextWeekBooking = await Booking.find({
        host: id,checkOut:{$gte:nextWeek},checkIn:{$lt:nextWeek}
    })
    
    
    res.send(data);
  } catch (err) {
      console.log("failed to get book")
      
    next(err);
  }
};

exports.updateBooking = async (req, res, next) => {};
