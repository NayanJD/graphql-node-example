const {
  ApolloError,
  AuthenticationError,
  UserInputError,
} = require("apollo-server");

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

class WrongPasswordError extends AuthenticationError {
  constructor() {
    super("Wrong password provided.", "USER_NOT_FOUND");
  }
}

class InvalidTokenError extends AuthenticationError {
  constructor() {
    super("Invalid token provided");
  }
}

class InternalError extends ApolloError {
  constructor() {
    super("Internal Error Occurred!");
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
  InvalidTokenError,
  InternalError,
  WrongPasswordError,
  throwUnauthorisedError,
  throwInternalError,
};
