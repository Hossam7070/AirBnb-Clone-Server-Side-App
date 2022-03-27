const Property = require("../Models/propertyModel");
const multer = require('multer');
const FilterSortlimit = require("../utilitis/FSLP");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.uploadTourImages = upload.fields([
  { name: 'imageCover', maxCount: 1 },
  { name: 'images', maxCount: 7 }
]);
exports.createNewProperty = async (req, res, next) => {
    const {
        title,
        description,
        long,
        lat,
        country,
        city,
        address,
        pricePN,
        avgRating,
        nRatings,
        imageCover,
        images,
        amienties,
        properties,
    } = req.body;
    const owner = req.user.id;
    try {
        const property = new Property({
            title,
            description,
            location: {
                country,
                city,
                address,
                long,
                lat,
            },
            owner,
            pricePN,
            avgRating,
            nRatings,
            imageCover,
            images,
            amienties,
            properties,
        });
        const newProp = await property.save();
        res.send(newProp);
    } catch (err) {
        next(err);
    }
};

exports.getAllProperties = async (req, res, next) => {
    try {
        const Props = await Property.find();
        res.send(Props);
    } catch (error) {
        next(error);
    }
};

exports.editMyProp = async (req, res, next) => {
    const {
        title,
        description,
        long,
        lat,
        country,
        city,
        address,
        pricePN,
        avgRating,
        nRatings,
        imageCover,
        images,
        amienties,
        properties,
    } = req.body;
    const { id } = req.params;
    try {
        const updated = await Property.findByIdAndUpdate(id, {
            title,
            description,
            long,
            lat,
            country,
            city,
            address,
            pricePN,
            avgRating,
            nRatings,
            imageCover,
            images,
            amienties,
            properties,
        });
        res.send(updated);
    } catch (error) {
        next(error);
    }
};

exports.deleteMyProp = async (req, res, next) => {
    const { id } = req.params;
    try {
        const deleteOne = await Property.findByIdAndDelete(id);
        if (!deleteOne || deleteOne == null) {
            const error = new Error(`not found`);
            return next(error);
        } else res.send("deleted succesfuly");
    } catch (error) {
        next(error);
    }
};
exports.getAll = listing =>
  catchAsync(async (req, res, next) => {
    
    let filter = {};
    

    const features = new FilterSortlimit(listing.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    // const doc = await features.query.explain();
    const doc = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        data: doc
      }
    });
  });