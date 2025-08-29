import { Sequelize } from "sequelize";

export const conn = new Sequelize("api_receitas","root", "Sen@iDev77!.", {
    host: "localhost",
    dialect: "mysql",
    port: 3306
})