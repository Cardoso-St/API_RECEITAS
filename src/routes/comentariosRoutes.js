import { Router } from "express";
import autenticarToken from "../middleware/autenticacaoJWT.js";
import {
    criarComentario,
    listarComentariosReceita,
    editarComentario,
    deletarComentario,
    listarComentariosUsuario,
    mediaAvaliacaoReceita
} from "../controllers/comentariosController.js";

const router = Router();


router.post("/receitas/:id/comentarios", autenticarToken, criarComentario);
router.get("/receitas/:id/comentarios", listarComentariosReceita);
router.put("/comentarios/:id", autenticarToken, editarComentario);
router.delete("/comentarios/:id", autenticarToken, deletarComentario);
router.get("/usuarios/comentarios", autenticarToken, listarComentariosUsuario);
router.get("/receitas/:id/avaliacao", mediaAvaliacaoReceita);

export default router;
