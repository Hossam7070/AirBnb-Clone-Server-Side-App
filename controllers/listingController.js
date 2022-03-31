const Listing = require('../Models/listingModel')
const multer = require('multer');
const sharp = require('sharp');
const multerStorage = multer.memoryStorage();


exports.createListing = async (req, res, next) => {
  const { id } = req.params
  const {
    name,
    city,
    bathrooms,
    bedrooms,
    neighbourhood_cleansed,
    summary,
    number_of_reviews,
    xl_picture_url,
    amenities,
    host_thumbnail_url,
    host_name,
    price,
    guests_included,
    description,
    cancellation_policy,
    geo_location,
    property_type
  } = req.body;
  try {
    const listing = new Listing({
      name,
      city,
      bathrooms,
      bedrooms,
      neighbourhood_cleansed,
      summary,
      number_of_reviews,
      xl_picture_url,
      amenities,
      host_thumbnail_url,
      host_name,
      price,
      guests_included,
      cancellation_policy,
      description,
      geo_location,
      host: id,
      property_type
    })
    const newList = await listing.save();
    res.json(newList);
  } catch (err) {
    next(err);
  }
};

exports.editListing = async (req, res, next) => {
  const { id } = req.params;
  const {
    name,
    city,
    bathrooms,
    bedrooms,
    neighbourhood_cleansed,
    summary,
    number_of_reviews,
    xl_picture_url,
    amenities,
    host_thumbnail_url,
    host_name,
    price,
    guests_included,
    description,
    cancellation_policy,
    geo_location,
    property_type
  } = req.body
  try {
    const updated = await Listing.findByIdAndUpdate(id, {
      name,
      city,
      bathrooms,
      bedrooms,
      neighbourhood_cleansed,
      summary,
      number_of_reviews,
      xl_picture_url,
      amenities,
      host_thumbnail_url,
      host_name,
      price,
      guests_included,
      description,
      cancellation_policy,
      geo_location,
      property_type,
    })
    const result = await Listing.findById(id)
    const data = { fields: { result } };
    res.send(updated)
  } catch (err) {
    next(err);
  }
};

exports.deleteListing = async (req, res, next) => {
  const { id } = req.params
  try {
    const listing = await listing.findByIdAndDelete(id)
    if (listing) {
      res.send("deleted")
    } else {
      next("not found")
    }

  } catch (err) {
    next(err);
  }
};

exports.getAllListings = async (req, res, next) => {
  try {
    const listings = await Listing.find();
    const data = { fields: { listings } };
    res.send(data);
  } catch (err) {
    next(err);
  }
};

exports.getListingById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const listing = await Listing.findById(id);
   if(!listing) {
    next(new Error('listing not found'));
   }else{
    res.send(listing);
   }
  } catch (err) {
    err.statusCode=404
    err.message="not found"
    next(err);
  }
};

exports.getListingsByhost = async (req, res, next) => {
  const { id } = req.params;
  try {
    const listing = await Listing.find({ host: id });
    res.send(listing);
  } catch (err) {
    next(err);
  }
};


const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
      cb(null, true);
    } else {
      cb(new Error('Not an image! Please upload only images'));
    }
  };
  const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
  });
  exports.uploadListImages = upload.fields([
    
    { name: 'xl_picture_url', maxCount: 7 }
  ]);
  exports.resizePropImages = async (req, res, next) => {
    if (!req.files.xl_picture_url) return next();
  
   
   
    try{
  
    // 2) Images
    req.body.xl_picture_url = [];
  
    await Promise.all(
      req.files.xl_picture_url.map(async (file, i) => {
        const filename = `listing-${req.params.id}-${Date.now()}-${i + 1}.jpeg`;
  
        await sharp(file.buffer)
          .resize(2000, 1333)
          .toFormat('jpeg')
          .jpeg({ quality: 90 })
          .toFile(`public/${filename}`);
  
        req.body.xl_picture_url.push(filename);
  
        const updated = await Listing.findByIdAndUpdate(req.params.id,{xl_picture_url:req.body.xl_picture_url});
      })
    );
  
    next();
    }catch(err) {
      next(err);
    }
  };

  exports.createListingUpload = async (req, res, next) => {
    const { id } = req.params
    const {
      name,
      city,
      bathrooms,
      bedrooms,
      neighbourhood_cleansed,
      summary,
      number_of_reviews,
      xl_picture_url,
      amenities,
      host_thumbnail_url,
      host_name,
      price,
      guests_included,
      description,
      cancellation_policy,
      geo_location,
      property_type
    } = req.body;
    try {
      const listing = new Listing({
        name,
        city,
        bathrooms,
        bedrooms,
        neighbourhood_cleansed,
        summary,
        number_of_reviews,
        xl_picture_url,
        amenities,
        host_thumbnail_url,
        host_name,
        price,
        guests_included,
        cancellation_policy,
        description,
        geo_location,
        host: id,
        property_type
      })
      const newList = await listing.save();
      req.params.listID = newList._id;
      console.log()
      next()
      
    } catch (err) {
      next(err);
    }
  };