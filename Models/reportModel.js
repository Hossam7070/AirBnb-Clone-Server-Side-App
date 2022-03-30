const mongoose = require('mongoose')
// { reporterId , targetId , description , type , date } 

const ReportsSchema = new mongoose.Schema({
    reporter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reporter"  // host or user
    },
    target: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Target"  //  prop or host or user
    },
    description: {
        type: String,
        required: [true, 'You must provide the description']
    },
    type: {
        type: String,
        enum: ['report', 'review', 'feedback'],
        required: [true, 'You must select report type']

    },
    creationDate: {
        type: Date,
        default: Date.now()
    }

})



const Reports = mongoose.model('Reports', ReportsSchema);
module.exports = Reports;

