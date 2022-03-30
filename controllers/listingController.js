const Listing = require('../Models/listingModel')

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
    const data = { fields: { listing } };
    res.send(listing);
  } catch (err) {
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


