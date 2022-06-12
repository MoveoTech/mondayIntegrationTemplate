const dotenv = require("dotenv");
const joi = require("joi");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "../.env") });

const envVarsSchema = joi
    .object()
    .keys({
        NODE_ENV: joi.string().valid("production", "development").required(),
        PORT: joi.number().positive().required(),
        MYSQL_HOST: joi.string().required().description("My mySQL host"),
        MYSQL_PORT: joi.number().required().description("My mySQL port"),
        MYSQL_USER: joi.string().required().description("My mySQL user"),
        MYSQL_PASS: joi.string().required().description("My mySQL password"),
        MYSQL_DB_NAME: joi.string().required().description("My db name"),
        MYSQL_CONNECTION_LIMIT: joi.number().required().description("My mySQL connection limit"),
        MYSQL_CONNECT_TIMEOUT: joi.number().required().description("My mySQL connect timeout"),
        MYSQL_ACQUIRE_TIMEOUT: joi.number().required().description("My mySQL acquire timeout"),
        MYSQL_TIMEOUT: joi.number().required().description("My mySQL timeout"),
        MONDAY_AUTHORIZATION_URL: joi.string().required().description("My mySQL auth URL"),
        MONDAY_CLIENT_ID: joi.string().required().description("My mySQL port"),
        MONDAY_CLIENT_SECRET: joi.string().required().description("My client secret"),
        MONDAY_SIGNING_SECRET: joi.string().required().description("My signing secret")
    })
    .unknown();

const { value: envVars, error } = envVarsSchema
    .prefs({ errors: { label: "key" } })
    .validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    mysqlHost: envVars.MYSQL_HOST,
    mysqlPort: envVars.MYSQL_PORT,
    mysqlUser: envVars.MYSQL_USER,
    mysqlPass: envVars.MYSQL_PASS,
    mysqlDbName: envVars.MYSQL_DB_NAME,
    mysqlConnectionLimit: envVars.MYSQL_CONNECTION_LIMIT,
    mysqlConnectTimeout: envVars.MYSQL_CONNECT_TIMEOUT,
    mysqlAcquireTimeout: envVars.MYSQL_ACQUIRE_TIMEOUT,
    mysqlTimeout: envVars.MYSQL_TIMEOUT,
    mondayAuthUrl: envVars.MONDAY_AUTHORIZATION_URL,
    mondayClientId: envVars.MONDAY_CLIENT_ID,
    mondayClientSecret: envVars.MONDAY_CLIENT_SECRET,
    mondaySigningSecret: envVars.MONDAY_SIGNING_SECRET
};