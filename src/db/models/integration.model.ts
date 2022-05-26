import { AllowNull, Column, DataType, Table, TableOptions, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import BaseModel from './base.model';

export interface IntegrationAttributes {
  row_id: number;
  mon_user_id: number;
  mon_account_id: number;
  recipe_id: number;
  integration_id: number;
  board_id: number;
  created_at: Date;
  modified_at: Date;
}

export interface IntegrationCreationAttributes {
  row_id: IntegrationAttributes['row_id'];
}

const tableOptions: TableOptions = {
  tableName: 'integrations',
  indexes: [
    {
      unique: true,
      fields: ['mon_user_id', 'mon_account_id'],
    },
  ]
}

@Table(tableOptions)
export class IntegrationDbModel extends BaseModel<IntegrationAttributes, IntegrationCreationAttributes> implements IntegrationAttributes {

  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  public row_id!: number;

  @AllowNull(false)
  @Column(DataType.BIGINT)
  public mon_user_id!: number;

  @AllowNull(false)
  @Column(DataType.BIGINT)
  public mon_account_id!: number;

  @AllowNull(false)
  @Column(DataType.BIGINT)
  public recipe_id!: number;

  @AllowNull(false)
  @Column(DataType.BIGINT)
  public integration_id!: number;

  @AllowNull(false)
  @Column(DataType.BIGINT)
  public board_id!: number;
}
