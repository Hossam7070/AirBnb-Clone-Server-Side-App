const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
  },
  { timestamps: true }  //When you enable timestamps, Mongoose adds createdAt and updatedAt properties to your schema. By default
);

module.exports = mongoose.model("Conversation", ConversationSchema);
