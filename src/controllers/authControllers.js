import usuariosModel from "../models/usuariosModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (request, response) => {
  const { email, senha } = request.body;

  try {
    const usuario = await usuariosModel.findOne({ where: { email } });
    if (!usuario) return response.status(401).json({ mensagem: "Email ou senha incorretos" });

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) return response.status(401).json({ mensagem: "Email ou senha incorretos" });

    const payload = { id: usuario.id, nome: usuario.nome, email: usuario.email, tipoUsuario: usuario.tipoUsuario };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "15m" });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });

    response.status(200).json({
      success: true,
      data: {
        user: { id: usuario.id, nome: usuario.nome, email: usuario.email, tipoUsuario: usuario.tipoUsuario },
        accessToken,
        refreshToken,
        expiresIn: 900
      }
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};
