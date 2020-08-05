const config = require("config");

module.exports = {
  jwtOptions: {
    secretKey: config.get("jwtOptions.secretKey"),
    audience: config.get("jwtOptions.audience"),
    issuer: config.get("jwtOptions.issuer"),
    algorithm: config.get("jwtOptions.algorithm"),
    expiresIn: config.get("jwtOptions.expiresIn"),
  },
};
