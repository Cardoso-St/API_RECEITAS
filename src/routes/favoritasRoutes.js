import { Router } from "express";
import { adicionarFavorito, removerFavorito, listarFavoritosUsuario, detalhesFavorito } from "../controllers/favoritosController.js";
import autenticarToken from "../middleware/autenticacaoJWT.js";
import verificarAdmin from "../middleware/verificarAdmin.js";

const router = Router();

// Proteger rota com JWT (usuário precisa estar logado)
router.post("/", autenticarToken, adicionarFavorito);
router.delete("/:id", autenticarToken, removerFavorito);
router.get("/", autenticarToken, listarFavoritosUsuario);
router.get("/:id", autenticarToken, detalhesFavorito);
router.get("/admin/favoritas", autenticarToken, verificarAdmin, listarTodosFavoritos);

export default router;