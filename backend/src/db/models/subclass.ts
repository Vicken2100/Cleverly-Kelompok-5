import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from ".";
import ClassModel from "./class";

export interface SubClassAtrribute {
  id: number;
  xid: string;
  name: string;
  image: string;
  class: string;
  materi: string;
  createAt?: Date;
  updateAt?: Date;
}

export type Input = Optional<SubClassAtrribute, "id">;
export type SubClassOptional = "id" | "createAt" | "updateAt";
export type SubClassAtrributeCreation = Optional<
  SubClassAtrribute,
  SubClassOptional
>;

class SubClass
  extends Model<SubClassAtrribute, Input>
  implements SubClassAtrribute
{
  public id!: number;
  public xid!: string;
  public name!: string;
  public image!: string;
  public class!: string;
  public materi!: string;

  public readonly createAt!: Date;
  public readonly updateAt!: Date;
}

SubClass.init(
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
      unique: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    class: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    materi: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize: sequelizeConnection,
    modelName: "subclass",
    underscored: true,
  }
);

ClassModel.hasMany(SubClass, {
  foreignKey: "class",
  sourceKey: "name",
});

SubClass.belongsTo(ClassModel, {
  foreignKey: "class",
});

export default SubClass;
