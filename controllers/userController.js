const User = require("../Models/userModel");
const Prop = require("../Models/propertyModel");
const multer = require("multer");
const sharp = require("sharp");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image! Please upload only images"));
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single("photo");

exports.resizeUserPhoto = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!req.file) return next();
    req.user = await User.findById(id);
    req.file.filename = `user-${req.user._id}-${Date.now()}.jpeg`;

    await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`public/img/users/${req.file.filename}`);

    next();
  } catch (err) {
    next(err);
  }
};
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.updateMe = async (req, res, next) => {
  // 2) Filtered out unwanted fields names that are not allowed to be updated
  try {
    const filteredBody = filterObj(req.body, "username", "email");
    if (req.file) filteredBody.photo = req.file.filename;

    // 3) Update user document
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      filteredBody,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: "success",
      data: {
        user: updatedUser,
      },
    });
  } catch (error) {
    next(error);
  }
};
exports.updateUser = async (req, res, next) => {
  console.log(req.user._id)

  const {
    firstName,
    lastName,
    city,
    postalCode,
    address,
    about,
    password,
    email,
    username,
    role,
  } = req.body;
  try {
    const updated = await User.findByIdAndUpdate(req.user.id, {
      firstName,
      lastName,
      city,
      postalCode,
      address,
      about,
      password,
      email,
      username,
      role,
    });
    const user = await User.findById(req.user.id);
    res.send(user);
  } catch (error) {
    next(error);
  }
};
exports.registerUser = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      city,
      postalCode,
      address,
      about,
      password,
      email,
      username,
      role,
    } = req.body;
    const user = new User({
      firstName,
      lastName,
      city,
      postalCode,
      address,
      about,
      password,
      email,
      username,
      role,
    });
    const newUser = await user.save();

    res.send(newUser);
  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
};
exports.registerUser = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      city,
      postalCode,
      address,
      about,
      password,
      email,
      username,
      role,
    } = req.body;
    const user = new User({
      firstName,
      lastName,
      city,
      postalCode,
      address,
      about,
      password,
      email,
      username,
      role,
    });
    const newUser = await user.save();

    res.send(newUser);
  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
};
exports.findMyProperties = async (req, res, next) => {
  //TODO : find all properties of certain user by user id
  //AUTH : protect
  try {
    const user = req.user;
    const myProps = await Prop.find().where("owner").equals(user._id);
    res.send(myProps);
  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
};

exports.getMyDetails = async (req, res, next) => {
  //TODO: get user details by id
  //AUTH : protect
  try {
    res.send(req.user);
  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
};

// exports.getdatabyid = async (req, res, next) => {
//   const { id } = req.params;
//   try {
//     const userDate = await User.findById(id);
//     const data = {
//       username: userDate.username,
//       city: userDate.city,
//       photo: userDate.photo
//     }
//     res.send(data);
//   } catch (err) {
//     next(err);
//   }
// };
exports.getMyDetailsById = async (req, res, next) => {
  //TODO: get user details by id
  //AUTH : protect
  const { id } = req.params
  try {
    const user = await User.findById(id);
    if(!user){
      next(new Error("user not found "))
    }else{
      res.send(user);
    }
    
  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
};


