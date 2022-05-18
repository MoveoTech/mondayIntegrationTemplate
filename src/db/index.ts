import { Sequelize } from "sequelize-typescript";
import { IntegrationDbModel } from "./models/integration.model";
import { MondayTokenDbModel } from "./models/monday-access-token.model";

export const initConnection = async () => {

  const sequelizeOptions = {
    logging: false,
    dialect: "mysql",
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    pool: {
      max: parseInt(process.env.MYSQL_CONNECTION_LIMIT),
      min: 1,
      idle: parseInt(process.env.MYSQL_CONNECT_TIMEOUT),
      acquire: parseInt(process.env.MYSQL_ACQUIRE_TIMEOUT),
      evict: parseInt(process.env.MYSQL_TIMEOUT),
    },
    models: [IntegrationDbModel, MondayTokenDbModel] // Tables
  } as any;
  const sequelizeClient = new Sequelize(
    process.env.MYSQL_DB_NAME,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASS,
    sequelizeOptions
  );

  try {
    await sequelizeClient.authenticate();
  } catch (error) {
    console.log('error', error);
  };

  return sequelizeClient;
};
