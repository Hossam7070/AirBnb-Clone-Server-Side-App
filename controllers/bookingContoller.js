const Booking = require("../Models/bookingModel");
const Property = require("../Models/propertyModel");
const Listing = require("../Models/listingModel");
const isToday = require("date-fns/isToday");
var isWithinInterval = require("date-fns/isWithinInterval");
const startOfToday = require("date-fns/startOfToday");
var addWeeks = require("date-fns/addWeeks");
const isTomorrow = require("date-fns/isTomorrow");
var startOfTomorrow = require("date-fns/startOfTomorrow");
var subDays = require("date-fns/subDays");
var addDays = require("date-fns/addDays");
var parseISO = require('date-fns/parseISO')
const dataAnalysis = require("../utilitis/hostDataAnalysis")
var areIntervalsOverlapping = require('date-fns/areIntervalsOverlapping')
var intervalToDuration = require('date-fns/intervalToDuration')

exports.handleConflict = async (req, res, next) => {
    const { checkOut, checkIn, property } = req.body

    try {
        const prop = await Booking.find({ property: property }).then(result => result.forEach(
            booking => {
                if (
                    areIntervalsOverlapping(
                        { start: new Date(booking.checkIn), end: new Date(booking.checkOut) },
                        { start: new Date(checkIn), end: new Date(checkOut) }
                    )
                ) {
                    console.log("hii")
                    throw new Error("intervals overlap")
                }
            }
        ));





    } catch (err) { next(err); }
    next();
}

exports.createBooking = async (req, res, next) => {
    const { property, host, guest, checkOut, checkIn } = req.body;
    try {
        const booking = new Booking({
            property,
            host,
            guest,
            checkOut,
            checkIn
        });
        const newBooking = await booking.save();
        res.send(newBooking);
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
        const myBookings = await Booking.find({ host: id });
        res.send(myBookings);
    } catch (err) {
        next(err);
    }
};
exports.getBookningsByHostSumm = async (req, res, next) => {
    const { id } = req.params;
    const ins = [];

    const today = startOfToday();
    try {
        const stats = await Booking.find({ host: id })
            .select("checkIn checkOut property")
            .then((result) =>
                result.forEach(
                    (status) =>
                        ins.push({ in: status.checkIn, out: status.checkOut })

                )
            );
        const monthlyBookings = ins.filter(el =>
            isWithinInterval(today, { start: el.in, end: addDays(today, 30) })
        ).length
        let earnings = 0;
        const earningsMap = ins.map(el => {
            earnings = earnings + intervalToDuration({
                start: new Date(el.in),
                end: new Date(el.out)
            }).days * 120
        })
        console.log(earnings);
        const data = [{
            "Earnings in August": earnings,
            "Overall rating": 4.5,

            "30-days bookings": monthlyBookings,
            "30-day views": 8
        }]

        res.json(data);

    } catch (err) {
        err.statusCode=500;
        err.message="user or data not found"
        next(err);
    }
};
exports.getMyReservations = async (req, res, next) => {
    const { id } = req.params;
    try {
        const myBookings = await Booking.find({ guest: id })
        res.send(myBookings)
    } catch (err) {
        next(err);
    }
};
exports.getBookningsByProp = async (req, res, next) => {
    const { id } = req.params;
    try {
        const myBookings = await Booking.find({ property: id });
        res.send(myBookings);
    } catch (err) {
        next(err);
    }
};


exports.getMyCurruntBookings = async (req, res, next) => {
    const { id } = req.params;

    // console.log(today,tomorrow,nextWeek)
    try {
        const data = await Booking.find({
            host: id,
            approved: "pending"
        });
        res.send(data);
    } catch (err) {
        console.log("failed to get book");
        next(err);
    }
};
exports.approveRequest = async (req, res, next) => {
    try {
        const { id } = req.params;
        const aprroved = "accepted";
        const update = await Booking.findByIdAndUpdate(id, {
            aprroved: aprroved
        })
        res.send("accepted");
    } catch (err) {
        next(err);
    }
}

exports.getMystats = async (req, res, next) => {
    //get array of check ins & check outs for each property
    // count no. of check in & outs today tomorrow and next week
    // count currunt reservation  today tomorrow and next week
    const ins = [];
    const outs = [];
    const today = startOfToday();
    const tomorrow = startOfTomorrow();
    const { id } = req.params;
    try {
        const stats = await Booking.find({ host: id })
            .select("checkIn checkOut property")
            .then((result) =>
                result.forEach(
                    (status) =>
                        ins.push({ date: status.checkIn, prop: status.property }) &&
                        outs.push({ date: status.checkOut, prop: status.property })
                )
            );
        const todayBooking = await Booking.find({
            host: id,
            checkOut: { $gte: today },
            checkIn: { $lte: today },
        }).count();
        const tomorrowBooking = await Booking.find({
            host: id,
            checkOut: { $gte: tomorrow },
            checkIn: { $lte: tomorrow },
        }).count();
        const nextWeekBooking = await Booking.find({
            host: id,
            checkOut: { $gte: addWeeks(today, 1) },
            checkIn: { $lt: addWeeks(today, 1) },
        }).count();
        const todayCheckins = ins.filter((el) => isToday(el.date)).length;
        const todayCheckOuts = outs.filter((el) => isToday(el.date)).length;
        const tomorrowsCheckins = ins.filter((el) => isTomorrow(el.date)).length;
        const tomorrowsCheckOuts = outs.filter((el) => isTomorrow(el.date)).length;
        // const nextWeekCheckins = ins.filter(el=>)
        console.log(addWeeks(today, 1));
        const nextWeekCheckins = ins.filter((el) =>
            isWithinInterval(el.date, { start: today, end: addWeeks(today, 1) })
        ).length;
        const nextWeekCheckOuts = outs.filter((el) =>
            isWithinInterval(el.date, { start: today, end: addWeeks(today, 1) })
        ).length;
        let data = [
            {
                today: {
                    checkin: todayCheckins,
                    checkout: todayCheckOuts,
                    trips: todayBooking,
                    pendingReviews: 1
                },
                tomorrow: {
                    checkin: tomorrowsCheckins,
                    checkout: tomorrowsCheckOuts,
                    trips: tomorrowBooking,
                    pendingReviews: 1
                },
                week: {
                    checkin: nextWeekCheckins,
                    checkout: nextWeekCheckOuts,
                    trips: nextWeekBooking,
                    pendingReviews: 1
                },
            },
        ];
        res.send(data);
    } catch (err) {
        next(err);
    }
};
exports.occupancyRate = async (req, res, next) => {
    const { id } = req.params;
    const stat = [];
    const stats = [];
    try {
        const hostOc = await Booking.find({ host: id })
            .select("checkIn checkOut")
            .then((result) =>
                result.forEach((status) =>
                    stat.push({
                        in: status.checkIn,
                        out: status.checkOut,
                    })
                )
            );
        const overallOc = await Booking.find()
            .select("checkIn checkOut")
            .then((result) =>
                result.forEach((status) =>
                    stats.push({
                        in: status.checkIn,
                        out: status.checkOut,
                    })
                )
            );
        const prop = await Listing.find({ owner: id }).count();
        const props = await Listing.find().count();
        const result = dataAnalysis.getAnalysis(stat, prop, stats, props)

        res.json(result);
    } catch (e) {
        next(e);
    }
};

exports.cancelMyBooking = async (req, res, next) => {
    const { id } = req.params;
    const aprroved = "canceled";
    try {
        const canceled = await Booking.findByIdAndUpdate(id, {
            aprroved: aprroved
        });

        res.send("canceled")
    } catch (e) {
        next(e);
    }
};

exports.updateBooking = async (req, res, next) => {
    try {
        let err = new Error("No matching  found");
        const bookings = await Booking.find();
        if (!bookings.filter((x) => x.id === req.params.id).length) {
            err.statusCode = 404;
            next(new Error(err));
        }
        const { property, host, guest, approved, checkIn, checkOut } = req.body;
        const updated = await Booking.findByIdAndUpdate(req.params.id,
            { property, host, guest, approved, checkIn, checkOut },
        );
        res.send(updated);
    } catch (error) {
        error.statusCode = 500;
        res.send("error");
    }
};

