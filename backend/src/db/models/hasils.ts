import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "./index";

export interface HasilsAttribute {
  id: number;
  xid: string;
  username: string;
  hasil: string;
  judulkuiz: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export type HasilsCreationAttribute = Optional<HasilsAttribute, "id">;
export type HasilsOptionalAttribute = "id" | "createdAt" | "updatedAt";

class Hasils extends Model<HasilsAttribute, HasilsCreationAttribute> implements HasilsAttribute {
  public id!: number;
  public xid!: string;
  public username!: string;
  public hasil!: string;
  public judulkuiz!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Hasils.init(
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
    hasil: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    judulkuiz: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeConnection,
    modelName: "hasils",
    tableName: "hasils",
    underscored: true,
  }
);

export default Hasils;