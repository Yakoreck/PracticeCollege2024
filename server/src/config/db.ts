import { Sequelize } from "sequelize";
require("dotenv").config();

console.log(process.env.JWTSECRET);
const sequelize = new Sequelize(
  process.env.DATABASE!,
  process.env.USER!,
  process.env.PASSWORD!,
  {
    host: process.env.HOST,
    dialect: "mysql",
  }
);

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await sequelize.sync();
    console.log("Database synchronized.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export default sequelize;
