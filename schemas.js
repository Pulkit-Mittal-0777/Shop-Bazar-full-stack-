const Joi = require('joi');
module.exports.productSchema=Joi.object({
    name:Joi.string().required(),
    img:Joi.string().required(),
    price:Joi.number().min(0).required(),
    desc:Joi.string().required()
});

module.exports.reviewSchema=Joi.object({
    ratings:Joi.number().min(0).max(5),
    comments:Joi.string().required()
})
