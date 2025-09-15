import chefModel from "./chefModel.js";
import receitasModel from "./receitasModel.js";

chefModel.belongsToMany(receitasModel, {
  through: "chef_receitas",
  foreignKey: "chef_id",
  otherKey: "receitas_id",
});

receitasModel.belongsToMany(chefModel, {
  through: "chef_receitas",
  foreignKey: "receitas_id",
  otherKey: "chef_id",
});

export { chefModel, receitasModel };
