import chefModel from "./chefModel.js";
import receitasModel from "./receitasModel.js";
import usuariosModel from "./usuariosModel.js";
import favoritosModel from "./favoritosModel.js";


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

usuariosModel.hasMany(favoritosModel, { foreignKey: "usuarioId", as: "favoritos" });
favoritosModel.belongsTo(usuariosModel, { foreignKey: "usuarioId", as: "usuario" });

receitasModel.hasMany(favoritosModel, { foreignKey: "receitaId", as: "favoritos" });
favoritosModel.belongsTo(receitasModel, { foreignKey: "receitaId", as: "receita" });

export { chefModel, receitasModel, usuariosModel, favoritosModel };

