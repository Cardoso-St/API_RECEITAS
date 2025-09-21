// models/curtidasModel.js
import { DataTypes } from "sequelize";
import { conn } from "../config/sequelize.js";

const curtidasModel = conn.define(
    "Curtidas",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        usuarioId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        receitaId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        timestamps: true,
        tableName: "Curtidas",
        updatedAt: false,
    }
);

export default curtidasModel;
