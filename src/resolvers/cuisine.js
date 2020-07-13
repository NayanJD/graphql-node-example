const logger = require("../helpers/logger");

const { throwInternalError } = require("../helpers/errors");

const { ApolloError } = require("apollo-server");

const query = {
  Cuisine: {
    //Resolver for chef property of Cuisine
    chef: async (parent, args, context) => {
      if (!parent.user_id) {
        return [];
      }

      let user;
      try {
        user = await context.db.user.findOne({
          where: { id: parent.user_id },
        });
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

      return user;
    },
  },
};

module.exports = query;
