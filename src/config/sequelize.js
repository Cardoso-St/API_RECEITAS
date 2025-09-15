import { Sequelize } from "sequelize";

export const conn = new Sequelize("api_receitas","root", "123456789", {
    host: "localhost",
    dialect: "mysql",
    port: 3306
})