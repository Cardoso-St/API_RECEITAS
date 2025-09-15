import { request, response } from "express";
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

  const dificuldade = request.body.dificuldade || "facil";

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

    response
      .status(200)
      .json({ mensagem: "Receita cadastrada", receitasComChefs });
  } catch (error) {
    console.log(error);
    response.status(500).json({ mensagem: "erro interno do servidor" });
  }
};

export const buscarReceitas = async (request, response) => {
  const page = parseInt(request.query.page) || 1;
  const limit = parseInt(request.query.limit) || 10;
  const offset = (page - 1) * limit;

  const { dificuldade } = request.query;

  try {
    const receitas = await receitasModel.findAndCountAll({
      where:
        dificuldade &&
        ["facil", "medio", "dificil"].includes(dificuldade.toLowerCase())
          ? { dificuldade: dificuldade.toLowerCase() }
          : {},
      offset,
      limit,
      include: {
        model: chefModel,
        attributes: { exclude: ["created_at", "updated_at"] },
        through: { attributes: [] },
      },
      attributes: { exclude: ["created_at", "updated_at"] },
    });

    response.status(200).json({
      totalReceitas: receitas.count,
      totalPaginas: Math.ceil(receitas.count / limit),
      paginaAtual: page,
      receitasPorPagina: limit,
      receitas: receitas.rows,
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({ mensagem: "Erro interno ao listar receitas" });
  }
};

export const buscarReceita = async (request, response) => {
  const { id } = request.params;

  try {
    const receita = await receitasModel.findByPk(id);
    console.log(receita);

    if (!receita) {
      return response.status(404).json({ mensagem: "receita não encontradas" });
    }

    const receitasComChefs = await receitasModel.findByPk(receita.id, {
      attributes: { exclude: ["created_at", "updated_at"] },
      include: {
        model: chefModel,
        attributes: { exclude: ["created_at", "updated_at"] },
        through: { attributes: [] },
      },
    });

    response
      .status(200)
      .json({ mensagem: "Receita cadastrada", receitasComChefs });
  } catch (error) {
    console.log(error);
    response.status(500).json({ mensagem: "erro interno do servidor" });
  }
};

export const atualizarReceita = async (request, response) => {
  const { id } = request.params;
  const {
    titulo,
    descricao,
    ingredientes,
    modoPreparo,
    tempoPreparo,
    porcoes,
    chefs,
    dificuldade,
  } = request.body;

  try {
    const receita = await receitasModel.findByPk(id);
    if (!receita) {
      return response.status(404).json({ mensagem: "Receita não encontrada" });
    }

    if (titulo !== undefined && !titulo) {
      return response
        .status(400)
        .json({ mensagem: "O campo titulo não pode ser nulo" });
    }
    if (descricao !== undefined && !descricao) {
      return response
        .status(400)
        .json({ mensagem: "O campo descricao não pode ser nulo" });
    }
    if (ingredientes !== undefined && !ingredientes) {
      return response
        .status(400)
        .json({ mensagem: "O campo ingredientes não pode ser nulo" });
    }
    if (modoPreparo !== undefined && !modoPreparo) {
      return response
        .status(400)
        .json({ mensagem: "O campo modoPreparo não pode ser nulo" });
    }
    if (tempoPreparo !== undefined && !tempoPreparo) {
      return response
        .status(400)
        .json({ mensagem: "O campo tempoPreparo não pode ser nulo" });
    }
    if (porcoes !== undefined && !porcoes) {
      return response
        .status(400)
        .json({ mensagem: "O campo porcoes não pode ser nulo" });
    }

    await receita.update({
      titulo,
      descricao,
      ingredientes,
      modoPreparo,
      tempoPreparo,
      porcoes,
      dificuldade: dificuldade || receita.dificuldade, 
    });

    if (Array.isArray(chefs)) {
      const chefsEncontrados = await chefModel.findAll({
        where: { id: chefs },
      });

      if (chefsEncontrados.length !== chefs.length) {
        return response.status(404).json({
          mensagem: "Um ou mais IDs de chefs são inválidos ou não existem",
        });
      }

      await receita.setChefs(chefs); 
    }

    const receitaAtualizada = await receitasModel.findByPk(receita.id, {
      attributes: { exclude: ["created_at", "updated_at"] },
      include: {
        model: chefModel,
        attributes: { exclude: ["created_at", "updated_at"] },
        through: { attributes: [] },
      },
    });

    return response.status(200).json({
      mensagem: "Receita atualizada com sucesso",
      receita: receitaAtualizada,
    });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};
