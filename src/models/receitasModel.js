import { DataTypes } from "sequelize";
import { conn } from "../config/sequelize.js";

const receitasModel = conn.define(
  "Receitas",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ingredientes: {
        type: DataTypes.STRING,
        allowNull: false
    },
    modoPreparo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tempoPreparo: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    porcoes: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    dificuldade: {
        type: DataTypes.ENUM("facil", "medio", "dificil"),
        allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: 'Receitas',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);

export default receitasModel;