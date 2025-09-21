import { comentarioModel, receitasModel, usuariosModel } from "../models/association.js";


export const criarComentario = async (request, response) => {
    const usuarioId = request.usuario.id;
    const { id: receitaId } = request.params;
    const { texto, avaliacao } = request.body;

    if (!texto || !avaliacao) {
        return response.status(400).json({ mensagem: "Texto e avaliação são obrigatórios" });
    }

    try {
        const comentario = await comentarioModel.create({
            usuarioId,
            receitaId,
            texto,
            avaliacao,
            aprovado: false,
        });

        response.status(201).json({ mensagem: "Comentário criado com sucesso", comentario });
    } catch (error) {
        console.error(error);
        response.status(500).json({ mensagem: "Erro interno do servidor" });
    }
};

export const listarComentariosReceita = async (request, response) => {
    const { id: receitaId } = request.params;

    try {
        const comentarios = await comentarioModel.findAll({
            where: { receitaId, aprovado: true },
            include: {
                model: usuariosModel,
                as: "usuario",
                attributes: ["id", "nome", "email"],
            },
            order: [["createdAt", "DESC"]],
        });

        response.status(200).json(comentarios);
    } catch (error) {
        console.error(error);
        response.status(500).json({ mensagem: "Erro interno do servidor" });
    }
};

export const editarComentario = async (request, response) => {
    const usuarioId = request.usuario.id;
    const { id } = request.params;
    const { texto, avaliacao } = request.body;

    try {
        const comentario = await comentarioModel.findByPk(id);
        if (!comentario) return response.status(404).json({ mensagem: "Comentário não encontrado" });

        if (comentario.usuarioId !== usuarioId)
            return response.status(403).json({ mensagem: "Você só pode editar seus próprios comentários" });

        await comentario.update({ texto, avaliacao });

        response.status(200).json({ mensagem: "Comentário atualizado com sucesso", comentario });
    } catch (error) {
        console.error(error);
        response.status(500).json({ mensagem: "Erro interno do servidor" });
    }
};

export const deletarComentario = async (request, response) => {
    const usuarioId = request.usuario.id;
    const { id } = request.params;

    try {
        const comentario = await comentarioModel.findByPk(id);
        if (!comentario) return response.status(404).json({ mensagem: "Comentário não encontrado" });

        if (comentario.usuarioId !== usuarioId)
            return response.status(403).json({ mensagem: "Você só pode deletar seus próprios comentários" });

        await comentario.destroy();
        response.status(200).json({ mensagem: "Comentário deletado com sucesso" });
    } catch (error) {
        console.error(error);
        response.status(500).json({ mensagem: "Erro interno do servidor" });
    }
};

export const listarComentariosUsuario = async (request, response) => {
    const usuarioId = request.usuario.id;

    try {
        const comentarios = await comentarioModel.findAll({
            where: { usuarioId },
            include: {
                model: receitasModel,
                as: "receita",
                attributes: ["id", "titulo"],
            },
            order: [["createdAt", "DESC"]],
        });

        response.status(200).json(comentarios);
    } catch (error) {
        console.error(error);
        response.status(500).json({ mensagem: "Erro interno do servidor" });
    }
};

export const mediaAvaliacaoReceita = async (request, response) => {
  const { id: receitaId } = request.params;

  try {
    const media = await comentarioModel.findOne({
      attributes: [
        [Sequelize.fn("AVG", Sequelize.col("avaliacao")), "mediaAvaliacao"]
      ],
      where: { receitaId, aprovado: true },
    });

    response.status(200).json({
      receitaId,
      mediaAvaliacao: parseFloat(media.dataValues.mediaAvaliacao || 0).toFixed(1),
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

