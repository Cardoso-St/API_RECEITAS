import { chefModel, receitasModel } from "../models/association.js";

export const cadastrarReceita = async (request, response) => {
  const {
    titulo,
    descricao,
    ingredientes,
    modoPreparo,
    tempoPreparo,
    porcoes,
    chefs,
  } = request.body;

  const dificuldade = request.body.funcao || "facil";

  if (!titulo) {
    response.status(400).json({ mensagem: "O campo titulo não ser nulo" });
    return;
  }

  if (!descricao) {
    response.status(400).json({ mensagem: "O campo descricao não ser nulo" });
    return;
  }

  if (!ingredientes) {
    response
      .status(400)
      .json({ mensagem: "O campo ingredientes não ser nulo" });
    return;
  }
  if (!modoPreparo) {
    response.status(400).json({ mensagem: "O campo modoPreparo não ser nulo" });
    return;
  }
  if (!tempoPreparo) {
    response
      .status(400)
      .json({ mensagem: "O campo tempoPreparo não ser nulo" });
    return;
  }
  if (!porcoes) {
    response.status(400).json({ mensagem: "O campo porcoes não ser nulo" });
    return;
  }

  if (!Array.isArray(chefs) || chefs.length === 0) {
    response.status(400).json({
      mensagem: "O campo chefs dever ser array e possui pelo menos um chef",
    });
    return;
  }

  try {
    const chefsEncontrados = await chefModel.findAll({
      where: {
        id: chefs,
      },
    });
    console.log("Retorno do banco: ", chefsEncontrados.length);
    console.log("Quantidade do request: ", chefs.length);

    if (chefsEncontrados.length !== chefs.length) {
      response.status(404).json({
        mensagem: "Um ou mais IDs de autores são inválidos ou não existe",
      });
      return;
    }

    const receitas = await receitasModel.create({
      titulo,
      descricao,
      ingredientes,
      modoPreparo,
      tempoPreparo,
      porcoes,
      dificuldade,
      chefs,
    });
    await receitas.addChefs(chefs);

    const receitasComChefs = await receitasModel.findByPk(receitas.id, {
      attributes: { exclude: ["created_at", "updated_at"] },
      include: {
        model: chefModel,
        attributes: { exclude: ["created_at", "updated_at"] },
        through: { attributes: [] },
      },
    });

    response.status(200).json({ mensagem: "Receita cadastrada", receitasComChefs });
  } catch (error) {
    console.log(error);
    response.status(500).json({ mensagem: "erro interno do servidor" });
  }
};
