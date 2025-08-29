import chefModel from "../models/chefModel.js";

export const cadastrarChef = async (request, response) => {
    const { nome, biografia, especialidade, experiencia, nacionalidade } = request.body;

    //Método ANTIGO

    /*if (!nome) {
        return response.status(400).json({
            error: "Campo nome inválido",
            mensagem: "O campo nome não pode ser nulo"
        });
    }
    if (!biografia) {
        return response.status(400).json({
            error: "Campo biografia inválido",
            mensagem: "O campo biografia não pode ser nulo"
        });
    }
    if (!especialidade) {
        return response.status(400).json({
            error: "Campo especialidade inválido",
            mensagem: "O campo especialidade não pode ser nulo"
        });
    }
    if (!experiencia) {
        return response.status(400).json({
            error: "Campo experiencia inválido",
            mensagem: "O campo experiencia não pode ser nulo"
        });
    }
    if (!nacionalidade) {
        return response.status(400).json({
            error: "Campo nacionalidade inválido",
            mensagem: "O campo nacionalidade não pode ser nulo"
        });
    }*/

    //Método novo

    const campos = [
        { valor: nome, campo: 'nome' },
        { valor: biografia, campo: 'biografia' },
        { valor: experiencia, campo: 'experiencia' },
        { valor: especialidade, campo: 'especialidade' },
        { valor: nacionalidade, campo: 'nacionalidade' }
    ];

    const validacoes = campos.reduce((acumuladora, { valor, campo }) => {
        if (!valor) {
            acumuladora.push({
                error: `Campo ${campo} inválido`,
                mensagem: `O campo ${campo} não pode ser nulo`
            });
        }
        return acumuladora;
    }, []);

    if (validacoes.length > 0) {
        return response.status(400).json(validacoes);
    }

    const chef = {
        nome,
        biografia,
        especialidade,
        experiencia,
        nacionalidade
    };

    try {
        const novoChef = await chefModel.create(chef);
        response.status(201).json({ mensagem: "Chef criado com sucesso", novoChef });
    } catch (error) {
        console.error(error);
        response.status(500).json({ mensagem: "Erro interno ao cadastrar autor" });
    }
}

export const listarChefs = async (request, response) => {
    const page = parseInt(request.query.page) || 1
    const limit = parseInt(request.query.limit) || 10
    const offset = (page - 1) * limit

    try {
        const Chefs = await chefModel.findAndCountAll({
            offset,
            limit
        })
        const totalPaginas = Math.ceil(Chefs.count / limit)
        response.status(200).json({
            totalChefs: Chefs.count,
            totalPaginas,
            paginaAtual: page,
            ChefsPorPagina: limit,
            Chefs: Chefs.rows
        })
    } catch (error) {
        console.log(error)
        response.status(500).json({ mensagem: "Erro interno ao listar Chefs" })

    }

}

export const listarChef = async (request, response) => {

    const { id } = request.params; // Obtém o ID da URL

    try{
        const {id} = request.params
        const chefId = await chefModel.findByPk(id)
        console.log(chefId);
    
        if(!chefId){
            return response.status(404).json({mensagem: "autor não encontrado"})
        }
    
        response.status(200).json({mensagem: chefId})
    } catch (error){
        console.error(error);
        response.status(500).json({mensagem: "erro INterno servidor"})
    }
}

