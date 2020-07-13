const Joi = require("@hapi/joi");

//Schema for createCuisine mutation payload
const createCuisineSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
});

module.exports = { createCuisineSchema };
