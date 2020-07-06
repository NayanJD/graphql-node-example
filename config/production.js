require("dotenv/config");

const {
  DEV_DB_DIALECT,
  JWT_AUDIENCE,
  JWT_ISSUER,
  JWT_ALGORITHM,
  JWT_EXPIRES_IN,
  DATABASE_URL,
  DEV_AWS_SES_SENDER,
  DEV_APP_DOMAIN,
  DEV_ERR_LOG_FILE,
  DEV_OUT_LOG_FILE,
  DEV_AWS_S3_BUCKET_NAME,
} = process.env;

module.exports = {
  databaseUrl: DATABASE_URL,
  dialect: DEV_DB_DIALECT,
  jwtOptions: {
    audience: JWT_AUDIENCE,
    issuer: JWT_ISSUER,
    algorithm: JWT_ALGORITHM,
    expiresIn: JWT_EXPIRES_IN,
  },
  //   s3: {
  //     bucketName: DEV_AWS_S3_BUCKET_NAME,
  //   },
};
