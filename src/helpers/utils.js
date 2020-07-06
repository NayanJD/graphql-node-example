const _ = require("lodash");

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
