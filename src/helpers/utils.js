const _ = require("lodash");

const logger = require("./logger");

async function validateJoiSchema(schema, payload) {
  try {
    const value = await schema.validateAsync(payload);
  } catch (error) {
    logger.error(error);
    throw error;
  }
}

module.exports = {
  validateJoiSchema,
};
