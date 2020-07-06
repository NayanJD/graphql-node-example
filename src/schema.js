const { gql } = require("apollo-server-express");

const resolvers = require("./resolvers");

const typeDefs = gql`
  type Query {
    test: String!
  }
  type Mutation {
    signup(username: String!, password: String!, name: String!): signUpResponse!

    login(username: String!, password: String!): loginResponse!

    updateUser(name: String): User!
  }

  type User {
    id: ID!
    name: String!
    username: String!
    createdAt: String!
    updatedAt: String!
  }

  type signUpResponse {
    message: String!
  }

  type loginResponse {
    user: User!
    access_token: String!
  }
`;

const env = process.env.NODE_ENV || "development";

module.exports = {
  typeDefs,
  resolvers,
  tracing: true,
  introspection: true,
  playground: true,
};
