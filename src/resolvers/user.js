const logger = require("../helpers/logger");

const { throwInternalError } = require("../helpers/errors");

const { ApolloError } = require("apollo-server");

const query = {
  User: {
    //Resolver for cuisines property of User
    cuisines: async (parent, args, context) => {
      if (!parent.id) {
        return [];
      }

      let cuisines;
      try {
        cuisines = await context.db.cuisine.findAll({
          where: { user_id: parent.id },
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

      return cuisines;
    },
  },
};

module.exports = query;
