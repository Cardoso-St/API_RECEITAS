import { Router } from "express";
import { atualizarReceita, buscarImagemReceita, buscarReceita, buscarReceitas, cadastrarImagemReceita, cadastrarReceita, deletarImagemReceita, deletarReceita, filtrarReceitasPorChef } from "../controllers/receitasController.js";
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
router.delete("/:id/imagem", imagemUpload.single('imagem'), deletarImagemReceita)


export default router;
