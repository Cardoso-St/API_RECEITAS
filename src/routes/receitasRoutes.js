import { Router } from "express";
import { atualizarReceita, buscarReceita, buscarReceitas, cadastrarReceita, deletarReceita } from "../controllers/receitasController.js";

const router = Router()

router.post("/", cadastrarReceita )
router.get("/", buscarReceitas )
router.get("/:id", buscarReceita)
router.put(":/id", atualizarReceita)
router.delete(":/id", deletarReceita)
router.get("chef/:id")

export default router;
