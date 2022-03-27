const express = require("express");
const router = express.Router();
const message = require("../controllers/messageController");



// create message
router.route("/")
  .post(
    message.createMessage
  )

//git all messages for specific conversation
router.route("/:conversationId")
  .get(
    message.getMessages
  )


module.exports = router;