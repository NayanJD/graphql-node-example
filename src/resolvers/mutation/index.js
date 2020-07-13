const userMutations = require("./user");

const cuisineMutations = require("./cuisine");

const mutation = {
  ...userMutations,
  ...cuisineMutations,
};

module.exports = mutation;
