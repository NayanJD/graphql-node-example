const logger = require("../../helpers/logger");

const { ApolloError } = require("apollo-server");

const {
  InvalidTokenError,
  InternalError,
  UserNotFoundError,
} = require("../../helpers/errors");

const query = {
  me: async (parent, args, context) => {
    //Throw error if caller is unauthorised
    if (!context.user) {
      throw new InvalidTokenError();
    }

    let user;
    try {
      user = await context.db.user.findOne({
        where: { id: context.user },
      });

      //user does not exists
      if (!user) {
        throw new UserNotFoundError();
      }
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

    return user;
  },
};

module.exports = query;
