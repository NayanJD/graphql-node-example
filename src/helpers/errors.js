const { ApolloError, AuthenticationError } = require("apollo-server");

class UserAlreadyExistsError extends ApolloError {
  constructor() {
    super("An account with this email already exists", "USER_ALREADY_EXISTS");
  }
}

class UserNotFoundError extends ApolloError {
  constructor() {
    super("User does not exists", "USER_NOT_FOUND");
  }
}

function throwUnauthorisedError() {
  throw new AuthenticationError("Unauthorised call.");
}

function throwInternalError() {
  throw new ApolloError("Internal Error Occurred!");
}

module.exports = {
  UserAlreadyExistsError,
  UserNotFoundError,
  throwUnauthorisedError,
  throwInternalError,
};
