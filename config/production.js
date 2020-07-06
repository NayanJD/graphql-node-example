require("dotenv/config");

const {
  DEV_DB_DIALECT,
  DEV_JWT_AUDIENCE,
  DEV_JWT_ISSUER,
  DEV_JWT_ALGORITHM,
  DEV_JWT_EXPIRES_IN,
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
    audience: DEV_JWT_AUDIENCE,
    issuer: DEV_JWT_ISSUER,
    algorithm: DEV_JWT_ALGORITHM,
    expiresIn: DEV_JWT_EXPIRES_IN,
  },
  //   s3: {
  //     bucketName: DEV_AWS_S3_BUCKET_NAME,
  //   },
};
