const logger = require("../../helpers/logger");

const { ApolloError } = require("apollo-server");

const {
  throwInternalError,
  throwUnauthorisedError,
} = require("../../helpers/errors");

const query = {
  //Returns all cuisines
  cuisines: async (parent, args, context) => {
    //Throw error is caller is unauthorised
    if (!context.user) {
      throwUnauthorisedError();
    }

    let cuisines;
    try {
      cuisines = await context.db.cuisine.findAll();
    } catch (error) {
      logger.info(error);
      if (error instanceof ApolloError) {
        //throwing custom ApolloError
        throw error;
      } else {
        //Catches unknown errors
        throwInternalError();
      }
    }

    return cuisines;
  },
};

module.exports = query;
