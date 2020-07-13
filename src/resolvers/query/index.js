const userQueries = require("./user");

const cuisineQueries = require("./cuisine");

const query = {
  ...userQueries,
  ...cuisineQueries,
};

module.exports = query;
