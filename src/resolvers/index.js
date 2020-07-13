const Query = require("./query");

const Mutation = require("./mutation");

const userQueries = require("./user");

const cuisineQueries = require("./cuisine");

module.exports = {
  Query,
  Mutation,
  ...userQueries,
  ...cuisineQueries,
};
