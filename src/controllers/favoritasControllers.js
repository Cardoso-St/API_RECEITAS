import { usuariosModel, receitasModel, favoritosModel } from "../models/association.js";

export const adicionarFavorito = async (request, response) => {
    const { usuarioId, receitaId, categoria, observacoes, prioridade, tentativasPreparo } = request.body;

    try {
        const usuario = await usuariosModel.findByPk(usuarioId);
        if (!usuario) {
            return response.status(404).json({ mensagem: "Usuário não encontrado" });
        }

        const receita = await receitasModel.findByPk(receitaId);
        if (!receita) {
            return response.status(404).json({ mensagem: "Receita não encontrada" });
        }

        const favorito = await favoritosModel.create({
            usuarioId,
            receitaId,
            categoria: categoria || null,
            observacoes: observacoes || null,
            prioridade: prioridade || "baixa",
            tentativasPreparo: tentativasPreparo || 0,
        });

        return response.status(201).json({
            mensagem: "Receita adicionada aos favoritos com sucesso",
            favorito,
        });
    } catch (error) {
        console.error(error);
        return response.status(500).json({ mensagem: "Erro interno do servidor" });
    }
};

export const removerFavorito = async (request, response) => {
    const { id } = request.params;

    try {
        const favorito = await favoritosModel.findByPk(id);

        if (!favorito) {
            return response.status(404).json({ mensagem: "Favorito não encontrado" });
        }

        await favorito.destroy();

        return response.status(200).json({ mensagem: "Favorito removido com sucesso" });
    } catch (error) {
        console.error(error);
        return response.status(500).json({ mensagem: "Erro interno do servidor" });
    }
};

export const listarFavoritosUsuario = async (request, response) => {
    const usuarioId = request.usuario.id; 

    try {
        const favoritos = await favoritosModel.findAll({
            where: { usuarioId },
            include: [
                {
                    model: receitasModel,
                    as: "receita",
                    attributes: ["id", "titulo", "descricao", "tempoPreparo", "porcoes"],
                },
            ],
            order: [["dataAdicionada", "DESC"]],
        });

        return response.status(200).json(favoritos);
    } catch (error) {
        console.error(error);
        return response.status(500).json({ mensagem: "Erro interno do servidor" });
    }
};

export const detalhesFavorito = async (request, response) => {
    const { id } = request.params;
    const usuarioId = request.usuario.id;

    try {
        const favorito = await favoritosModel.findOne({
            where: { id, usuarioId },
            include: [
                {
                    model: receitasModel,
                    as: "receita",
                    attributes: ["id", "titulo", "descricao", "ingredientes", "modoPreparo", "tempoPreparo", "porcoes", "dificuldade"],
                },
            ],
        });

        if (!favorito) {
            return response.status(404).json({ mensagem: "Favorito não encontrado" });
        }

        return response.status(200).json(favorito);
    } catch (error) {
        console.error(error);
        return response.status(500).json({ mensagem: "Erro interno do servidor" });
    }
};

export const listarTodosFavoritosAdm = async (request, response) => {
  try {
    const favoritos = await favoritosModel.findAll({
      include: [
        {
          model: usuariosModel,
          as: "usuario",
          attributes: ["id", "nome", "email", "tipoUsuario"],
        },
        {
          model: receitasModel,
          as: "receita",
          attributes: ["id", "titulo", "descricao", "tempoPreparo", "porcoes"],
        },
      ],
      order: [["dataAdicionada", "DESC"]],
    });

    return response.status(200).json(favoritos);
  } catch (error) {
    console.error(error);
    return response.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};
