import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from ".";
import { SubClassAtrribute } from "./subclass";

export interface ClassAtrribute {
  id: number;
  xid: string;
  name: string;

  createAt?: Date;
  updateAt?: Date;
}

export interface ClassJoinAttribute extends ClassAtrribute {
  subclasses?: SubClassAtrribute;
}

export type Input = Optional<ClassAtrribute, "id">;
export type ClassOptional = "id" | "createAt" | "updateAt";
export type ClassAtrributeCreation = Optional<ClassAtrribute, ClassOptional>;

class ClassModel
  extends Model<ClassAtrribute, Input>
  implements ClassAtrribute
{
  public id!: number;
  public xid!: string;
  public name!: string;

  public readonly createAt!: Date;
  public readonly updateAt!: Date;
}

ClassModel.init(
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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeConnection,
    tableName: "class",
    underscored: true,
  }
);

export default ClassModel;
