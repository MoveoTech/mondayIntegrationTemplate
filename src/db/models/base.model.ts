import { Model, CreatedAt, UpdatedAt } from 'sequelize-typescript';

export interface BaseModelAttributes {
  created_at: Date;
  modified_at: Date;
};

export default abstract class BaseModel<Attributes extends object, CreateAttributes>
  extends Model<Attributes, CreateAttributes>
  implements BaseModelAttributes {
  @CreatedAt
  public created_at!: Date;

  @UpdatedAt
  public modified_at!: Date;

  toJSON(): Attributes {
    return super.toJSON() as Attributes;
  };
};
