const Property = require("../Models/propertyModel");

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
