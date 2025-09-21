import { curtidasModel, receitasModel } from "../models/association.js";

export const curtirReceita = async (req, res) => {
    const usuarioId = req.usuario.id;
    const { id: receitaId } = req.params;

    try {
        const jaCurtiu = await curtidasModel.findOne({ where: { usuarioId, receitaId } });
        if (jaCurtiu) {
            return res.status(400).json({ mensagem: "Você já curtiu essa receita" });
        }

        const curtida = await curtidasModel.create({ usuarioId, receitaId });

        return res.status(201).json({ mensagem: "Receita curtida com sucesso", curtida });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
};

export const descurtirReceita = async (req, res) => {
    const usuarioId = req.usuario.id;
    const { id: receitaId } = req.params;

    try {
        const curtida = await curtidasModel.findOne({ where: { usuarioId, receitaId } });
        if (!curtida) {
            return res.status(404).json({ mensagem: "Você não curtiu essa receita" });
        }

        await curtida.destroy();
        return res.status(200).json({ mensagem: "Curtida removida com sucesso" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
};

export const listarCurtidasUsuario = async (req, res) => {
    const usuarioId = req.usuario.id;

    try {
        const curtidas = await curtidasModel.findAll({
            where: { usuarioId },
            include: { model: receitasModel, as: "receita" },
        });

        return res.status(200).json(curtidas);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
};

