import { DataTypes } from "sequelize";
import { conn } from "../config/sequelize.js";
import receitasModel from "./receitasModel.js";

const favoritosModel = conn.define(
    "Favoritos",
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
        dataAdicionada: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        categoria: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        observacoes: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        prioridade: {
            type: DataTypes.ENUM("baixa", "media", "alta"),
            allowNull: false,
            defaultValue: "media",
        },
        tentativasPreparo: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
    },
    {
        timestamps: true,
        tableName: "Favoritos",
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

favoritosModel.belongsTo(receitasModel, {
    foreignKey: "receitaId",
    as: "receita",
});

receitasModel.hasMany(favoritosModel, {
    foreignKey: "receitaId",
    as: "favoritos",
});

export default favoritosModel;
