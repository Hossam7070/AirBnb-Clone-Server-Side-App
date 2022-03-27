const mongoose = require('mongoose')
// { propId , userId , duration { days , startDate} , 
// price { regular , custome , discount } , paymentMethod}

const BookingSchema = new mongoose.Schema({
    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property"
    },
    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    guest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    price: {
        regular: Number,
        custome: Number,
        discount: Number
    },
    aprroved: {
        type: String,

        enum: ['accepted', 'pending', 'canceled'],
        default: "pending",
        required: [true, 'You must select the  approved status']

    },

    checkIn: {
        type: Date,
        default: Date.now()
    },
    checkOut: {
        type: Date,
        required: [true, 'please provide check out date']
    },

})

BookingSchema.virtual('duration').get(
    function () {
        return this.checkOut - this.checkIn;
    }
)


const Booking = mongoose.model('Booking', BookingSchema);
module.exports = Booking;