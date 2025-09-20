import { Router } from "express";
import { cadastrarUsuario, buscarUsuarios, atualizarUsuario, buscaUsuario } from "../controllers/usuariosControllers.js";
import {autenticarToken} from "../middleware/autenticacaoJWT.js"

const router = Router()

router.post("/", cadastrarUsuario)
router.get("/", autenticarToken, buscarUsuarios)
router.put("/:id", autenticarToken, atualizarUsuario)
router.get("/:id", autenticarToken, buscaUsuario)

export default router