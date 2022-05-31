import { Sequelize } from 'sequelize-typescript';
import { IntegrationDbModel } from './models/integration.model';
import { MondayTokenDbModel } from './models/monday-access-token.model';

export const initConnection = async () => {
  const host = process.env.MYSQL_HOST;
  const port = process.env.MYSQL_PORT;
  const connectionLimit = process.env.MYSQL_CONNECTION_LIMIT;
  const connectTimeout = process.env.MYSQL_CONNECT_TIMEOUT;
  const acquireTimeout = process.env.MYSQL_ACQUIRE_TIMEOUT;
  const mySqlTimeout = process.env.MYSQL_TIMEOUT;
  const dbName = process.env.MYSQL_DB_NAME;
  const mysqlUser = process.env.MYSQL_USER;
  const mysqlPass = process.env.MYSQL_PASS;

  if (!host || !port || !connectionLimit || !connectTimeout || !acquireTimeout ||
    !mySqlTimeout || !dbName || !mysqlUser || !mysqlPass) {
    throw Error('[index:initConnection] - One of the constants does not exist');
  }

  const sequelizeOptions = {
    logging: false,
    dialect: 'mysql',
    host: host,
    port: port,
    pool: {
      max: parseInt(connectionLimit),
      min: 1,
      idle: parseInt(connectTimeout),
      acquire: parseInt(acquireTimeout),
      evict: parseInt(mySqlTimeout),
    },
    models: [IntegrationDbModel, MondayTokenDbModel] // Tables
  } as any;
  const sequelizeClient = new Sequelize(
    dbName,
    mysqlUser,
    mysqlPass,
    sequelizeOptions
  );

  try {
    await sequelizeClient.authenticate();
  } catch (err) {
    console.log('[index.ts:initConnection]', err);
  }

  return sequelizeClient;
};
