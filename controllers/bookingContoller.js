const Booking = require("../Models/bookingModel");
const Property = require("../Models/propertyModel");
const isToday = require("date-fns/isToday");
var isWithinInterval = require("date-fns/isWithinInterval");
const startOfToday = require("date-fns/startOfToday");
var addWeeks = require("date-fns/addWeeks");
const isTomorrow = require("date-fns/isTomorrow");
var startOfTomorrow = require('date-fns/startOfTomorrow')
var subDays = require('date-fns/subDays')
var addDays = require('date-fns/addDays')

exports.createBooking = async (req, res, next) => {
    const { property, host, guest, checkOut } = req.body;
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
        const myBookings = await Booking.find({ host: id });
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
    tomorrow.setDate(today + 1);
    const nextWeek = new Date();
    nextWeek.setDate(today + 7);
    // console.log(today,tomorrow,nextWeek)
    try {
        const data = {};
        data.today = await Booking.find({
            host: id,
            checkOut: { $gte: now },
            checkIn: { $lt: now },
        });
        data.tomorrow = await Booking.find({
            host: id,
            checkOut: { $gte: tomorrow },
            checkIn: { $lt: tomorrow },
        });
        data.nextWeek = await Booking.find({
            host: id,
            checkOut: { $gte: nextWeek },
            checkIn: { $lt: nextWeek },
        });

        res.send(data);
    } catch (err) {
        console.log("failed to get book");

        next(err);
    }
};
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
        const stats = await Booking.find({ user: id })
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

                },
                tomorrow: {
                    checkin: tomorrowsCheckins,
                    checkout: tomorrowsCheckOuts,
                    trips: tomorrowBooking,

                },
                week: {
                    checkin: nextWeekCheckins,
                    checkout: nextWeekCheckOuts,
                    trips: nextWeekBooking,

                },
            }
        ]
        res.send(data);
    } catch (err) {
        next(err);
    }
};

exports.occupancyRate= async (req, res, next) =>{
    const {id} = req.params
    const stat =[];
    
    try{
    const stats = await Booking.find({ user: id })
    .select("checkIn checkOut property")
    .then((result) =>
        result.forEach(
            (status) =>
                stat.push({ in: status.checkIn,out: status.checkOut,prop: status.property })
        )
    );
    const props = await Property.find({owner:id}).count();
    const today = startOfToday();
    const occHndler = (date,arr,prp)=>{
        const one = arr.filter((el) =>
      
        isWithinInterval(date, { start: el.in, end: el.out })
    ).length;
    return one/prp *100
    }
      
      
    
    
    const week=[
        {
            day: subDays(today,1),
            occupied: occHndler(subDays(today,1),stat,props),
            otherOccupied: 40
        },
        {
            day: subDays(today,2),
            occupied: occHndler(subDays(today,2),stat,props),
        },
        {
            day: subDays(today,3),
            occupied: occHndler(subDays(today,3),stat,props),
        },
        {
            day: subDays(today,4),
            occupied: occHndler(subDays(today,4),stat,props),
        },
        {
            day: subDays(today,5),
            occupied: occHndler(subDays(today,5),stat,props),
        },
        {
            day: subDays(today,6),
            occupied: occHndler(subDays(today,6),stat,props),
        },
        {
            day: subDays(today,7),
            occupied: occHndler(subDays(today,7),stat,props),
        }
      
    ]
        
            res.json(week);

    }catch(e) {
        
        next(e);
    }
}
exports.updateBooking = async (req, res, next) => { };
