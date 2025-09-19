import { Router } from "express";
import { cadastrarUsuario } from "../controllers/usuariosControllers.js";

const router = Router()

router.post("/", cadastrarUsuario)

export default router