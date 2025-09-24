import { curtidasModel, receitasModel } from "../models/association.js";

export const curtirReceita = async (request, response) => {
    const usuarioId = request.usuario.id;
    const { id: receitaId } = request.params;

    try {
        const jaCurtiu = await curtidasModel.findOne({ where: { usuarioId, receitaId } });
        if (jaCurtiu) {
            return response.status(400).json({ mensagem: "Você já curtiu essa receita" });
        }

        const curtida = await curtidasModel.create({ usuarioId, receitaId });

        return response.status(201).json({ mensagem: "Receita curtida com sucesso", curtida });
    } catch (error) {
        console.error(error);
        return response.status(500).json({ mensagem: "Erro interno do servidor" });
    }
};

export const descurtirReceita = async (request, response) => {
    const usuarioId = request.usuario.id;
    const { id: receitaId } = request.params;

    try {
        const curtida = await curtidasModel.findOne({ where: { usuarioId, receitaId } });
        if (!curtida) {
            return response.status(404).json({ mensagem: "Você não curtiu essa receita" });
        }

        await curtida.destroy();
        return response.status(200).json({ mensagem: "Curtida removida com sucesso" });
    } catch (error) {
        console.error(error);
        return response.status(500).json({ mensagem: "Erro interno do servidor" });
    }
};

export const listarCurtidasUsuario = async (request, response) => {
    const usuarioId = request.usuario.id;

    try {
        const curtidas = await curtidasModel.findAll({
            where: { usuarioId },
            include: { model: receitasModel, as: "receita" },
        });

        return response.status(200).json(curtidas);
    } catch (error) {
        console.error(error);
        return response.status(500).json({ mensagem: "Erro interno do servidor" });
    }
};

export const receitasMaisCurtidas = async (request, response) => {
    try {
        const receitas = await curtidasModel.findAll({
            attributes: [
                "receitaId",
                [Sequelize.fn("COUNT", Sequelize.col("receitaId")), "curtidasCount"],
            ],
            group: ["receitaId"],
            order: [[Sequelize.literal("curtidasCount"), "DESC"]],
            include: { model: receitasModel, as: "receita" },
        });

        return response.status(200).json(receitas);
    } catch (error) {
        console.error(error);
        return response.status(500).json({ mensagem: "Erro interno do servidor" });
    }
};