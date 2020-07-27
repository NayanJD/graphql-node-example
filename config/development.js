require("dotenv/config"); //To be used by sequelize-cli

const {
  DEV_APP_PORT,
  DEV_DB_USERNAME,
  DEV_DB_PASSWORD,
  DEV_DB_DATABASE_NAME,
  DEV_DB_HOST,
  DEV_DB_DIALECT,
  DEV_JWT_AUDIENCE,
  DEV_JWT_ISSUER,
  DEV_JWT_ALGORITHM,
  DEV_JWT_EXPIRES_IN,
  DEV_AWS_SES_SENDER,
  DEV_APP_DOMAIN,
  DEV_ERR_LOG_FILE,
  DEV_OUT_LOG_FILE,
  DEV_AWS_S3_BUCKET_NAME,
} = process.env;

module.exports = {
  appPort: DEV_APP_PORT,
  username: DEV_DB_USERNAME,
  password: DEV_DB_PASSWORD,
  database: DEV_DB_DATABASE_NAME,
  host: DEV_DB_HOST,
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
