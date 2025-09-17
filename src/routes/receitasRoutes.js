import { Router } from "express";
import { atualizarReceita, buscarImagemReceita, buscarReceita, buscarReceitas, cadastrarImagemReceita, cadastrarReceita, deletarReceita, filtrarReceitasPorChef } from "../controllers/receitasController.js";
import { imagemUpload } from "../middleware/imagemUpload.js";

const router = Router()

router.post("/", cadastrarReceita )
router.get("/", buscarReceitas )
router.get("/:id", buscarReceita)
router.put("/:id", atualizarReceita)
router.delete("/:id", deletarReceita)
router.get("/:id", filtrarReceitasPorChef)


//imagens
router.post("/:id/imagem", imagemUpload.single('imagem'), cadastrarImagemReceita)
router.get("/:id/imagem", imagemUpload.single('imagem'), buscarImagemReceita)

export default router;
