const Joi = require("@hapi/joi");

const loginPayloadSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

const signUpPayloadSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  name: Joi.string().required(),
});

const updateUserPayloadSchema = Joi.object({
  name: Joi.string().optional(),
});

module.exports = {
  signUpPayloadSchema,
  loginPayloadSchema,
  updateUserPayloadSchema,
};
