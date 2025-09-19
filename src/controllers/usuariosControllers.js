import usuariosModel from "../models/usuariosModels.js";
import bcrypt from "bcrypt";

export const cadastrarUsuario = async (request, response) => {
const { nome, email, senha, telefone, endereco } = request.body;
  const tipoUsuario = request.body.tipoUsuario || "comum";
  const ativo = request.body.ativo ?? true; 


  if (!nome) {
    return response.status(400).json({ mensagem: "O campo nome não pode ser nulo" });
  }
  if (!email) {
    return response.status(400).json({ mensagem: "O campo email não pode ser nulo" });
  }
  if (!senha) {
    return response.status(400).json({ mensagem: "O campo senha não pode ser nulo" });
  }
  if (!telefone) {
    return response.status(400).json({ mensagem: "O campo telefone não pode ser nulo" });
  }
  if (!endereco) {
    return response.status(400).json({ mensagem: "O campo endereco não pode ser nulo" });
  }

  try {
    // 🔑 Hash da senha
    const saltRounds = 10; 
    const senhaHash = await bcrypt.hash(senha, saltRounds);

    const usuario = {
      nome,
      email,
      senha: senhaHash, 
      telefone,
      endereco,
      tipoUsuario,
      ativo,
    };

    const novoUsuario = await usuariosModel.create(usuario);

    response.status(201).json({mensagem: "Usuário cadastrado com sucesso", novoUsuario});
  } catch (error) {
    console.error(error);
    response.status(500).json({ mensagem: "Erro interno do servidor" });
  }

}
