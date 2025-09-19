import chefModel from "./chefModel.js";
import receitasModel from "./receitasModel.js";

chefModel.belongsToMany(receitasModel, {
  through: "chef_receitas",
  foreignKey: "chef_id",
  otherKey: "receitas_id",
  onDelete: "CASCADE"
});

receitasModel.belongsToMany(chefModel, {
  through: "chef_receitas",
  foreignKey: "receitas_id",
  otherKey: "chef_id",
  onDelete: "CASCADE"
});

export { chefModel, receitasModel };
