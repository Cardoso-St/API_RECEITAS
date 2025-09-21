import { Router } from "express";
import autenticarToken from "../middleware/autenticacaoJWT.js";
import {
    curtirReceita,
    descurtirReceita,
    listarCurtidasUsuario,
    receitasMaisCurtidas
} from "../controllers/curtidasController.js";

const router = Router();


router.post("/receitas/:id/curtir", autenticarToken, curtirReceita);
router.delete("/receitas/:id/curtir", autenticarToken, descurtirReceita);
router.get("/usuarios/curtidas", autenticarToken, listarCurtidasUsuario);
router.get("/receitas/populares", receitasMaisCurtidas);

export default router;