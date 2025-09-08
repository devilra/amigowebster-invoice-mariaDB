const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql", // or "mysql"
    port: process.env.DB_PORT,
    logging: console.log,
  }
);

sequelize
  .authenticate()
  .then(() => console.log("Connected to MariaDB!"))
  .catch((err) => console.error("Connection failed:", err));

module.exports = sequelize;
