const Message = require("../Models/messageModel");


//add
exports.createMessage = async (req, res, next) => {
  const newMessage = new Message(req.body);

  try {
    const savedMessage = await newMessage.save();
    res.json(savedMessage);
  } catch (err) {
    next(err);
  }
};


//get 
exports.getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.json(messages);
  } catch (err) {
    next(err);
  }
};


