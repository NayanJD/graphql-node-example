const logger = require("../../helpers/logger");

const { ApolloError } = require("apollo-server");

const {
  throwInternalError,
  throwUnauthorisedError,
  UserNotFoundError,
} = require("../../helpers/errors");

const query = {
  me: async (parent, args, context) => {
    //Throw error if caller is unauthorised
    if (!context.user) {
      throwUnauthorisedError();
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
        throwInternalError();
      }
    }

    return user;
  },
};

module.exports = query;
