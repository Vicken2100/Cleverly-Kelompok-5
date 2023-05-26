import { Sequelize, Dialect } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const dbName = process.env.DB as string;
const dbHost = process.env.HOST;
const dbUsername = process.env.DB_USER as string;
const dbPassword = process.env.DB_PASS;
const dbDialect = process.env.DIALECT as Dialect;

const sequelizeConnection = new Sequelize(dbName, dbUsername, dbPassword, {
  host: dbHost,
  dialect: dbDialect,
});
const ConnectSequelize = async (): Promise<void> => {
  try {
    await sequelizeConnection
      .sync()
      .then(() => {
        console.log("All models in Sequelize were synchronized successfully.");
      })
      .catch((error) => {
        console.error(
          "An error occurred while synchronizing the models:",
          error
        );
      });
    await sequelizeConnection.authenticate();
    console.log("Connections Sequelize  OK");
  } catch (error) {
    console.log("Unable to connect to database Sequelize ", error);
  }
};

ConnectSequelize();

export default sequelizeConnection;
