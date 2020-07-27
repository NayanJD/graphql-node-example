const logger = require("../../helpers/logger");

const { InvalidTokenError, InternalError } = require("../../helpers/errors");

const { ApolloError } = require("apollo-server");

const { validateJoiSchema } = require("../../helpers/utils");

const { createCuisineSchema } = require("../../helpers/cuisine");

const mutations = {
  createCuisine: async (parent, args, context) => {
    //Throw error if caller is not authorised
    if (!context.user) {
      throw new InvalidTokenError();
    }

    const { name, description } = args;

    //validate payload
    await validateJoiSchema(createCuisineSchema, {
      name,
      description,
    });

    let newCuisine;
    try {
      newCuisine = await context.db.cuisine.create({
        name,
        description,
        user_id: context.user,
      });
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

    return newCuisine;
  },
};

module.exports = mutations;
