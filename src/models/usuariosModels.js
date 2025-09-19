import { DataTypes } from "sequelize";
import { conn } from "../config/sequelize.js";

const usuariosModel = conn.define(
  "Usuarios",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, 
      validate: {
        isEmail: true
      },
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8, 255],
          msg: "A senha deve ter pelo menos 8 caracteres (hash incluído)",
        },
      },
    },
    telefone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    endereco: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipoUsuario: {
      type: DataTypes.ENUM("comum", "admin"),
      allowNull: false,
      defaultValue: "comum",
    },
    ativo: {
      type: DataTypes.BOOLEAN, 
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    timestamps: true,
    tableName: "Receitas",
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default usuariosModel;
