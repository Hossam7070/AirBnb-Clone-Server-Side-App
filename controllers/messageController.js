const Message = require("../Models/messageModel");


//add
exports.createMessage = async (req, res, next) => {
  const { conversationId, sender, text } = req.body;
  const newMessage = new Message({ conversationId, sender, text });

  try {
    const savedMessage = await newMessage.save();
    res.send(savedMessage);
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
    res.send(messages);
  } catch (err) {
    next(err);
  }
};


