import chefModel from "./chefModel.js";
import receitasModel from "./receitasModel.js";
import usuariosModel from "./usuariosModel.js";
import favoritosModel from "./favoritosModel.js";
import curtidasModel from "./curtidasModel.js";
import comentarioModel from "./comentarioModel.js";


//Chef  Receitas (N:N)

chefModel.belongsToMany(receitasModel, {
  through: "chef_receitas",
  foreignKey: "chef_id",
  otherKey: "receitas_id",
  onDelete: "CASCADE",
});

receitasModel.belongsToMany(chefModel, {
  through: "chef_receitas",
  foreignKey: "receitas_id",
  otherKey: "chef_id",
  onDelete: "CASCADE",
});

//suário Favoritos (1:N)
usuariosModel.hasMany(favoritosModel, { foreignKey: "usuarioId", as: "favoritos" });
favoritosModel.belongsTo(usuariosModel, { foreignKey: "usuarioId", as: "usuario" });

//Receita Favoritos (1:N)
receitasModel.hasMany(favoritosModel, { foreignKey: "receitaId", as: "favoritos" });
favoritosModel.belongsTo(receitasModel, { foreignKey: "receitaId", as: "receita" });

//Usuário Curtidas (1:N)
usuariosModel.hasMany(curtidasModel, { foreignKey: "usuarioId", as: "curtidas" });
curtidasModel.belongsTo(usuariosModel, { foreignKey: "usuarioId", as: "usuario" });

//Receita Curtidas (1:N)
receitasModel.hasMany(curtidasModel, { foreignKey: "receitaId", as: "curtidas" });
curtidasModel.belongsTo(receitasModel, { foreignKey: "receitaId", as: "receita" });

//Usuário Comentários (1:N)

usuariosModel.hasMany(comentarioModel, { foreignKey: "usuarioId", as: "comentarios" });
comentarioModel.belongsTo(usuariosModel, { foreignKey: "usuarioId", as: "usuario" });

//Receita Comentários (1:N)

receitasModel.hasMany(comentarioModel, { foreignKey: "receitaId", as: "comentarios" });
comentarioModel.belongsTo(receitasModel, { foreignKey: "receitaId", as: "receita" });

export {
  chefModel,
  receitasModel,
  usuariosModel,
  favoritosModel,
  curtidasModel,
  comentarioModel,
};
