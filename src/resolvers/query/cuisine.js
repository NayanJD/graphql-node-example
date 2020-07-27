const logger = require("../../helpers/logger");

const { ApolloError } = require("apollo-server");

const { InvalidTokenError, InternalError } = require("../../helpers/errors");

const query = {
  //Returns all cuisines
  cuisines: async (parent, args, context) => {
    //Throw error is caller is unauthorised
    if (!context.user) {
      throw new InvalidTokenError();
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
        throw new InternalError();
      }
    }

    return cuisines;
  },
};

module.exports = query;
