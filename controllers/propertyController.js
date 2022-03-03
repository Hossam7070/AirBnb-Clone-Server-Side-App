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
        owner,
        imageCover,
        images,
        amienties,
        properties,
    } = req.body;
    try {
        const property = new Property({
            title,
            description,
            location: [
                {
                    country,
                    city,
                    address,
                    long,
                    lat,
                },
            ],
            pricePN,
            avgRating,
            nRatings,
            owner,
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




