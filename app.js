const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cors = require("cors");
app.use(cors());
const path = require('path');

app.use(express.static('public'));


app.use('/puplic', express.static('public'));
const port = 4000;

require('dotenv').config();
const userRouter = require("./routes/userRoutes");
const propertyRouter = require("./routes/propertyRoutes");

const listingRouter = require("./routes/listnigsRoutes");
const reportRouter = require("./routes/reportRoutes");
const conversationRouter = require("./routes/conversationsRoutes");
const messageRouter = require("./routes/messagesRoutes");
const bookingRouter = require("./routes/bookingRoutes");

//new
const messagesRouter = require("./routes/messagessRoutes");
const reviewRouter = require("./routes/reviewRoutes");




app.use('/user', userRouter);
app.use("/", propertyRouter);




app.use("/list", listingRouter);
app.use('/report', reportRouter);
app.use('/message', messageRouter);
app.use('/conversation', conversationRouter);
app.use('/booking', bookingRouter);

//new
app.use('/messages', messagesRouter);
app.use('/review', reviewRouter);





const uri = process.env.DBURI;
// console.log(uri);
mongoose.connect(uri, (err) => {
  if (err) process.exit(1);
  else {
    console.log("connected to database successfully");
  }
});


app.listen(port, () => {
  console.log(`express app listening on port ${port}`);
});



//middleware for Error handling 
app.use((err, req, res, next) => {
  res.send({
    status: err.statusCode,
    message: err.message,
    errors: err.errors || [],
  }).status(err.statusCode);
});



//fake api get all hosts properties

//this user details 
