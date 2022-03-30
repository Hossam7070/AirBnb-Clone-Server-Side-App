const Conversation = require("../Models/conversationModel");


//add 
exports.createConversation = async (req, res, next) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    res.send(savedConversation);
  } catch (err) {
    next(err);
  }
};
//




//get conv of a user
exports.getConversation = async (req, res, next) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.send(conversation);
  } catch (err) {
    next(err);
  }
};

// get conv includes two userId
exports.getTwoUsersConversation = async (req, res, next) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.send(conversation)
  } catch (err) {
    next(err);
  }
};


