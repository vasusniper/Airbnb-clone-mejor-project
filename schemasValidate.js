const joi=require('joi');
module.exports.listingSchema=joi.object({
    listing:joi.object({
        title:joi.string().required(),
        description:joi.string().required(),
        location:joi.string().required(),
        price:joi.number().required(),
        country:joi.string().required(),
        category:joi.string().required(),
        }).required()

});
// ----- review validate schema
module.exports.reviewSchema=joi.object({
    review:joi.object({
        rating:joi.number().required().min(1).max(5),
        comment:joi.string().required(),

    })

})