export default function verificarAdmin(request, response, next) {
    const usuario = request.usuario; // obtido pelo autenticarToken

    if (!usuario || usuario.tipoUsuario !== "admin") {
        return response.status(403).json({ mensagem: "Acesso negado: Admins apenas" });
    }

    next();
}