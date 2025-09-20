import { Router } from "express";
import { cadastrarUsuario, buscarUsuarios, atualizarUsuario, buscaUsuario } from "../controllers/usuariosControllers.js";

const router = Router()

router.post("/", cadastrarUsuario)
router.get("/", buscarUsuarios)
router.put("/:id", atualizarUsuario)
router.get("/:id", buscaUsuario)

export default router