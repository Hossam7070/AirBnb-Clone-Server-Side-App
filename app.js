const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 4000;
const cors = require("cors");
app.use(cors());
require('dotenv').config();

const propertyRouter = require("./routes/propertyRoutes");
const userRouter = require("./routes/userRoutes");

const reportRouter = require("./routes/reportRoutes");
const conversationRouter = require("./routes/conversationsRoutes");
const messageRouter = require("./routes/messagesRoutes");

// require('dotenv').config();

app.use("/", propertyRouter);
app.use('/user', userRouter);
app.use('/report', reportRouter);
app.use('/message', messageRouter);
app.use('/conversation', conversationRouter);






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
  });
});



//fake api get all hosts properties

//this user details 
