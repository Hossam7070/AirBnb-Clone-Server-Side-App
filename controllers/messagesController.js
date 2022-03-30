const Messages = require("../Models/messagesModel");


//create new message
exports.createMessage = async (req, res, next) => {
    const { from, to, text } = req.body;
    const newMessage = new Messages({ from, to, text });

    try {
        const savedMessage = await newMessage.save();
        res.send(savedMessage);
    } catch (err) {
        next(err);
    }
};


//get all by from => sender id
exports.getSenderMessages = async (req, res, next) => {
    try {
        const messages = await Messages.find({
            from: req.params.Id,
        });
        res.send(messages);
    } catch (err) {
        next(err);
    }
};

//get all by to => receiver id
exports.getReceiverMessages = async (req, res, next) => {
    try {
        const messages = await Messages.find({
            to: req.params.Id,
        });
        res.send(messages);
    } catch (err) {
        next(err);
    }
};


