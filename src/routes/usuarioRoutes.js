import { Router } from "express";
import { cadastrarUsuario, buscarUsuarios, atualizarUsuario } from "../controllers/usuariosControllers.js";

const router = Router()

router.post("/", cadastrarUsuario)
router.get("/", buscarUsuarios)
router.put("/:id", atualizarUsuario)

export default router