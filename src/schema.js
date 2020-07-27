const { gql } = require("apollo-server-express");

const resolvers = require("./resolvers");

const typeDefs = gql`
  type Query {
    me: User!
    cuisines: [Cuisine!]!
  }

  type Mutation {
    signup(username: String!, password: String!, name: String!): signUpResponse!

    login(username: String!, password: String!): loginResponse!

    updateUser(name: String): User!

    createCuisine(name: String!, description: String!): Cuisine!
  }

  type User {
    id: ID!
    name: String!
    username: String!
    createdAt: String!
    updatedAt: String!
    cuisines: [Cuisine!]!
  }

  type signUpResponse {
    message: String!
  }

  type loginResponse {
    user: User!
    access_token: String!
  }

  type Cuisine {
    id: ID!
    name: String!
    description: String!
    created_at: String!
    updated_at: String!
    chef: User!
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
