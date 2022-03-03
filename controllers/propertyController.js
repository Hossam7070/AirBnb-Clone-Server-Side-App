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
    const owner = req.user.id ;
    try {
        const property = new Property({
            title,
            description,
            location: 
                {
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




