const { promisify } = require("util");

const { isNumber, isString } = require("lodash");

const jsonwebtoken = require("jsonwebtoken");

const { ApolloError } = require("apollo-server");

const configuration = require("./configurations");

const verifyJWT = promisify(jsonwebtoken.verify);
const createJWT = promisify(jsonwebtoken.sign);

const filename = "/helpers/jwt.js:";

const {
  audience,
  issuer,
  algorithm,
  expiresIn,
  secretKey,
} = configuration.jwtOptions;

/**
 *
 * @param {number} userId user id
 * @returns {string} Returns jwt access token
 */
async function getAccessToken(userId) {
  if (!isNumber(userId)) {
    throw new ApolloError(
      `${filename}getAccessToken:: Non number userId provided`
    );
  }

  let accessToken = await createJWT({ user_id: userId }, secretKey, {
    header: {
      typ: "access",
    },
    audience,
    issuer,
    algorithm,
    expiresIn,
  });

  return accessToken;
}

/**
 *
 * @param {string} accessToken access token to be verified
 * @returns {number} Returns user id of the access token payload
 */
async function verifyAccessToken(accessToken) {
  if (!isString(accessToken)) {
    throw new ApolloError(
      `${filename}getAccessToken:: Non string accessToken provided`
    );
  }

  let userId;
  try {
    let payload = await verifyJWT(accessToken, secretKey, {
      algorithm: algorithm,
    });

    userId = payload.user_id;
  } catch (error) {
    console.log(error);
    // throw new AuthenticationError('Invalid access token.');
    return null;
  }

  return userId;
}

module.exports = {
  getAccessToken,
  verifyAccessToken,
};
