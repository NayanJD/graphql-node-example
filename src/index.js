const { ApolloServer } = require("apollo-server-express");

const schema = require("./schema");

const cors = require("cors");

const express = require("express");

const config = require("config");

const db = require("../models");

const logger = require("./helpers/logger");

const { verifyAccessToken } = require("./helpers/jwt");

db.sequelize
  .authenticate()
  .then(() =>
    logger.info(`Sequelize Connection has been established successfully.`)
  )
  .catch((err) => {
    logger.error("Unable to connect to the database:", err);
  });

const server = new ApolloServer({
  ...schema,
  context: async ({ req }) => {
    // Get the user token from the headers.
    let token = req.headers.authorization || "";

    token = token.split(" ")[1];

    // try to retrieve a user with the token
    let user;

    if (token) {
      user = await verifyAccessToken(token);
    }

    return {
      db: {
        ...db.sequelize.models,
        sequelize: db.sequelize,
      },
      user,
    };
  },
});

const app = express();

app.use(cors());

server.applyMiddleware({ app });

const PORT = config.get("appPort");

app.listen({ port: PORT }, () => {
  console.log(`Server is up and running on http://localhost:${PORT}/graphql`);
});
