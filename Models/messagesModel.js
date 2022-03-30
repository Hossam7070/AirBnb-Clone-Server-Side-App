const mongoose = require("mongoose");

const MessagesSchema = new mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sender"  // host or user
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "receiver"  //  host or user
    },
    text: {
        type: String,
        required: [true, 'You must provide the message text']
    },
    date: {
        type: Date,
        default: Date.now()
    },
    read: {
        type: Boolean,
        default: true
    }

})

module.exports = mongoose.model("Messages", MessagesSchema);
