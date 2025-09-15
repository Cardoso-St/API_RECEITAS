import { Router } from "express";
import { cadastrarReceita } from "../controllers/receitasController.js";

const router = Router()

router.post("/", cadastrarReceita )

export default router;
