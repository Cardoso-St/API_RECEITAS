import { Router } from "express";
import { adicionarFavorito } from "../controllers/favoritosController.js";
import autenticarToken from "../middleware/autenticacaoJWT.js";

const router = Router();

// Proteger rota com JWT (usuário precisa estar logado)
router.post("/", autenticarToken, adicionarFavorito);

export default router;