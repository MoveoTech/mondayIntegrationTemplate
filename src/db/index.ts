import { Sequelize } from 'sequelize-typescript';
import { IntegrationDbModel } from './models/integration.model';
import { MondayTokenDbModel } from './models/monday-access-token.model';

export const initConnection = async () => {
  const config = require('../../config/config')
  const { mysqlHost, mysqlPort, mysqlConnectionLimit,
    mysqlConnectTimeout, mysqlAcquireTimeout, mysqlTimeout,
    mysqlDbName, mysqlUser, mysqlPass } = config

  const sequelizeOptions = {
    logging: false,
    dialect: 'mysql',
    mysqlHost: mysqlHost,
    mysqlPort: mysqlPort,
    pool: {
      max: parseInt(mysqlConnectionLimit),
      min: 1,
      idle: parseInt(mysqlConnectTimeout),
      acquire: parseInt(mysqlAcquireTimeout),
      evict: parseInt(mysqlTimeout),
    },
    models: [IntegrationDbModel, MondayTokenDbModel] // Tables
  } as any;
  const sequelizeClient = new Sequelize(
    mysqlDbName,
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
