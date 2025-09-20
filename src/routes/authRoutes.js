import { Router } from "express";
import { login, logout, refreshToken, verificarToken } from "../controllers/authController.js";
import autenticarToken from "../middleware/autenticacaoJWT.js";

const router = Router();

// Login e refresh não precisam de autenticação
router.post("/login", login);
router.post("/refresh", refreshToken);

// Logout e verificar token precisam de autenticação
router.post("/logout", autenticarToken, logout);
router.get("/verificar", autenticarToken, verificarToken);

export default router;
