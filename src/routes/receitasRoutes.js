import { Router } from "express";
import { buscarReceita, buscarReceitas, cadastrarReceita } from "../controllers/receitasController.js";

const router = Router()

router.post("/", cadastrarReceita )
router.get("/", buscarReceitas )
router.get("/:id", buscarReceita)

export default router;
