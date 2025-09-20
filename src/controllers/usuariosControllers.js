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

    const usuarioExistente = await usuariosModel.findOne({ where: { email } });
    if (usuarioExistente) {
      return response.status(400).json({ mensagem: "Este e-mail já está cadastrado" });
    }

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

    response.status(201).json({ mensagem: "Usuário cadastrado com sucesso", novoUsuario });
  } catch (error) {
    console.error(error);
    response.status(500).json({ mensagem: "Erro interno do servidor" });
  }

}

export const buscarUsuarios = async (request, response) => {
  try {
    if (request.usuario.tipoUsuario !== "admin") {
      return response.status(403).json({ mensagem: "Acesso negado" });
    }

    const usuarios = await usuariosModel.findAll({
      attributes: { exclude: ["senha"] },
    });

    return response.status(200).json(usuarios);
  } catch (error) {
    console.error(error);
    return response.status(500).json({ mensagem: "Erro interno do servidor" });
  }
}

export const atualizarUsuario = async (request, response) => {
  const { id } = request.params;
  const { nome, email, senha, telefone, endereco, tipoUsuario, ativo } = request.body;

  try {
    if (request.usuario.id !== Number(id) && request.usuario.tipoUsuario !== "admin") {
      return response.status(403).json({ mensagem: "Acesso negado" });
    }

    const usuario = await usuariosModel.findByPk(id);
    if (!usuario) {
      return response.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    // Validações campo a campo
    if (nome !== undefined && !nome) {
      return response.status(400).json({ mensagem: "O campo nome não pode ser nulo" });
    }

    if (email !== undefined && !email) {
      return response.status(400).json({ mensagem: "O campo email não pode ser nulo" });
    }

    if (senha !== undefined && !senha) {
      return response.status(400).json({ mensagem: "O campo senha não pode ser nulo" });
    }

    if (telefone !== undefined && !telefone) {
      return response.status(400).json({ mensagem: "O campo telefone não pode ser nulo" });
    }

    if (endereco !== undefined && !endereco) {
      return response.status(400).json({ mensagem: "O campo endereco não pode ser nulo" });
    }

    if (email !== undefined) {
      const emailExistente = await usuariosModel.findOne({ where: { email } });
      if (emailExistente && emailExistente.id !== Number(id)) {
        return response.status(400).json({ mensagem: "Este e-mail já está em uso" });
      }
    }

    // 🔑 Hash da senha (se enviada)
    let senhaHash = usuario.senha;
    if (senha) {
      const saltRounds = 10;
      senhaHash = await bcrypt.hash(senha, saltRounds);
    }

    await usuario.update({
      nome: nome ?? usuario.nome,
      email: email ?? usuario.email,
      senha: senhaHash,
      telefone: telefone ?? usuario.telefone,
      endereco: endereco ?? usuario.endereco,
      tipoUsuario: tipoUsuario ?? usuario.tipoUsuario,
      ativo: ativo ?? usuario.ativo,
    });

    const usuarioAtualizado = await usuariosModel.findByPk(usuario.id, {
      attributes: { exclude: ["senha", "created_at", "updated_at"] },
    });

    return response.status(200).json({
      mensagem: "Usuário atualizado com sucesso",
      usuario: usuarioAtualizado,
    });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ mensagem: "Erro interno do servidor" });
  }
}

export const buscaUsuario = async (request, response) => {
  const { id } = request.params;

  try {
    if (request.usuario.id !== Number(id) && request.usuario.tipoUsuario !== "admin") {
      return response.status(403).json({ mensagem: "Acesso negado" });
    }

    const usuario = await usuariosModel.findByPk(id, {
      attributes: { exclude: ["senha"] },
    });

    if (!usuario) {
      return response.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    return response.status(200).json(usuario);
  } catch (error) {
    console.error(error);
    return response.status(500).json({ mensagem: "Erro interno do servidor" });
  }
}