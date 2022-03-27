const express = require("express");
const router = express.Router();
const conversation = require("../controllers/conversationController");



// create conversation
router.route("/")
  .post(
    conversation.createConversation
  )

//git all conversations for specific user
router.route("/:userId")
  .get(
    conversation.getConversation
  )

//git conversation between two users
router.route("/:firstUserId/:secondUserId")
  .get(
    conversation.getTwoUsersConversation
  )

module.exports = router;