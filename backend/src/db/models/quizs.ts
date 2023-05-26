import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "./index";
import SubClass from "./subclass";

export interface QuizsAttribute {
  id: number;
  xid: string;
  judul: string;
  tingkatkesulitan: string;
  deskripsi: string;
  soal: string;
  subclassname: string;
  tipe: boolean;
  nomor: number;
  jawaban: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export type QuizsCreationAttribute = Optional<QuizsAttribute, "id">;
export type QuizsOptionalAttribute = "id" | "createdAt" | "updatedAt";

class Quizs extends Model<QuizsAttribute, QuizsCreationAttribute> implements QuizsAttribute {
  public id!: number;
  public xid!: string;
  public judul!: string;
  public tingkatkesulitan!: string;
  public deskripsi!: string;
  public soal!: string;
  public subclassname!: string;
  public tipe!: boolean;
  public nomor!: number;
  public jawaban!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Quizs.init(
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
    judul: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tingkatkesulitan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deskripsi: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    soal: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nomor: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tipe: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
    subclassname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jawaban: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeConnection,
    modelName: "Quizs",
    tableName: "Quizs",
    underscored: true,
  }
);

export default Quizs;