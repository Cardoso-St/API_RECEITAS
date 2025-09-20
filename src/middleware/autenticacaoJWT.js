import jwt from "jsonwebtoken";

/**
 * Middleware para validar JWT e proteger rotas
 */
export default function autenticarToken(request, response, next) {
    const authHeader = request.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

    if (!token) {
        return response.status(401).json({ mensagem: "Token não fornecido" });
    }

    try {
        const usuario = jwt.verify(token, process.env.JWT_SECRET);
        request.usuario = usuario; // aqui você terá id, email, tipoUsuario etc.
        next();
    } catch (error) {
        console.error(error);
        return response.status(403).json({ mensagem: "Token inválido ou expirado" });
    }
}
