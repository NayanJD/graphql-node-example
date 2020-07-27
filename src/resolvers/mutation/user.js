const bcrypt = require("bcryptjs");

const { ApolloError } = require("apollo-server");

const logger = require("../../helpers/logger");

const { getAccessToken } = require("../../helpers/jwt");

const {
  UserAlreadyExistsError,
  UserNotFoundError,
  WrongPasswordError,
  InternalError,
} = require("../../helpers/errors");

const {
  signUpPayloadSchema,
  loginPayloadSchema,
  updateUserPayloadSchema,
} = require("../../helpers/user");

const { validateJoiSchema } = require("../../helpers/utils");
// const { uploadImageToS3 } = require("../../helpers/s3");

const mutations = {
  //Validates user fields. Creates username and url.
  //Hashes the password and saves the user in db.
  //Creates otp and email token and sends it to email
  signup: async (parent, args, context) => {
    const { username, name, password } = args;

    //validate payload
    await validateJoiSchema(signUpPayloadSchema, {
      username,
      password,
      name,
    });

    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      await context.db.sequelize.transaction(async (t) => {
        //Check if user exists with this email
        const dbUser = await context.db.user.findOne(
          { where: { username } },
          { transaction: t }
        );

        if (dbUser) {
          throw new UserAlreadyExistsError();
        } else {
          await context.db.user.create({
            username,
            name,
            hashed_password: hashedPassword,
          });
        }
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

    //Return success message
    return {
      message: "User has been created.",
    };
  },

  login: async (parent, args, context) => {
    const { username, password } = args;

    //Validate schema
    await validateJoiSchema(loginPayloadSchema, {
      username,
      password,
    });

    //Get the user
    const dbUser = await context.db.user.findOne({
      where: { username },
    });

    //User not found
    if (dbUser === null) {
      throw new UserNotFoundError();
    }

    //Check if password compares with hashed_password
    const match = await bcrypt.compare(password, dbUser.hashed_password);

    let accessToken;

    //Password matches
    if (match) {
      //Generate new access_token
      accessToken = await getAccessToken(dbUser.id);

      const now = new Date();

      //Set access_token
      dbUser.access_token = accessToken;
      dbUser.access_token_created_at = now.toISOString();

      try {
        //Save the user's access_token
        await dbUser.save();
      } catch (error) {
        throw new InternalError();
      }
    } else {
      //Password does not matches
      throw new WrongPasswordError();
    }

    return {
      user: dbUser,
      access_token: accessToken,
    };
  },

  updateUser: async (parent, args, context) => {
    if (!context.user) {
      throw new InvalidTokenError();
    }

    const { name } = args;

    await validateJoiSchema(updateUserPayloadSchema, {
      name,
    });

    const updatedFields = {};

    if (name) {
      updatedFields["name"] = name;
    }

    let user;
    try {
      await context.db.sequelize.transaction(async (t) => {
        user = await context.db.user.findOne(
          {
            where: { id: context.user },
          },
          { transaction: t }
        );

        if (!user) {
          throw new UserNotFoundError();
        }
        user.name = name;

        await user.save({ transaction: t });
      });
    } catch (error) {
      if (error instanceof ApolloError) {
        throw error;
      } else {
        throw new InternalError();
      }
    }

    return user;
  },
};

module.exports = mutations;
