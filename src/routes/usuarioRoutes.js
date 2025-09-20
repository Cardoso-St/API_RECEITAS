import { Router } from "express";
import { cadastrarUsuario, buscarUsuarios } from "../controllers/usuariosControllers.js";

const router = Router()

router.post("/", cadastrarUsuario)
router.get("/", buscarUsuarios)

export default router