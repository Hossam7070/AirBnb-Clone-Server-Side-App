const mongoose = require('mongoose')
// { propId , userId , duration { days , startDate} , 
// price { regular , custome , discount } , paymentMethod}

const BookingSchema = new mongoose.Schema({
    propId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "prop"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    duration: {
        days: Number,
        startDate: Number
    },
    price: {
        regular: Number,
        custome: Number,
        discount: Number
    },
    paymentMethod: {
        type: string,
        required: [true, 'please provide your payment method']

    },
    BookingDate: {
        type: Number,
        default: Date.now()
    }

})



const Booking = mongoose.model('Booking', BookingSchema);
module.exports = Booking;

