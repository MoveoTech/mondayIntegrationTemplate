import { AllowNull, Column, DataType, Table, TableOptions, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import BaseModel from "./base.model";

export interface MondayTokenAttributes {
  row_id: number;
  mon_user_id: number;
  mon_account_id: number;
  mon_access_token: string;
  created_at: Date;
  modified_at: Date;
};

export interface MondayTokenCreationAttributes {
  row_id: MondayTokenAttributes["row_id"];
};

const tableOptions: TableOptions = {
  tableName: "monday_access_tokens",
  indexes: [
    {
      unique: true,
      fields: ["mon_user_id", "mon_account_id"],
    },
  ]
};

@Table(tableOptions)
export class MondayTokenDbModel extends BaseModel<MondayTokenAttributes, MondayTokenCreationAttributes> implements MondayTokenAttributes {

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
  @Column(DataType.TEXT)
  public mon_access_token!: string;
};
