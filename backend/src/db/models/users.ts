import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from ".";

export interface UsersAtrribute {
  id: number;
  xid: string;
  username: string;
  password: string;
  status: string;
  active: boolean;

  createAt?: Date;
  updateAt?: Date;
}

export type Input = Optional<UsersAtrribute, "id">;
export type UsersOptional = "id" | "createAt" | "updateAt";
export type UsersAtrributeCreation = Optional<UsersAtrribute, UsersOptional>;

class User extends Model<UsersAtrribute, Input> implements UsersAtrribute {
  public id!: number;
  public xid!: string;
  public username!: string;
  public password!: string;
  public status!: string;
  public active!: boolean;

  public readonly createAt!: Date;
  public readonly updateAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    xid: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeConnection,
    modelName: "users",
    underscored: true,
  }
);

export default User;
