const express = require("express");
const router = express.Router();
const messages = require("../controllers/messagesController");



// create message
router.route("/")
    .post(
        messages.createMessage
    )

//git all sended messages  => from
router.route("/sender/:Id")
    .get(
        messages.getSenderMessages
    )

//git all received messages => to
router.route("/receiver/:Id")
    .get(
        messages.getReceiverMessages
    )


module.exports = router;