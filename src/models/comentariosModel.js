import { DataTypes } from "sequelize";
import { conn } from "../config/sequelize.js";

const comentarioModel = conn.define(
    "Comentarios",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        usuarioId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        receitaId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        texto: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        avaliacao: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: { min: 1, max: 5 },
        },
        aprovado: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        timestamps: true,
        tableName: "Comentarios",
    }
);

export default comentarioModel;
