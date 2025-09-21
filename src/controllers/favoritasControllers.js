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

