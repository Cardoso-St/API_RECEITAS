import { Router } from "express";
import { atualizarChef, cadastrarChef, deleteChef, listarChef, listarChefs } from "../controllers/chefControllers.js";

const router = Router()

router.post("/", cadastrarChef)
router.get("/", listarChefs)
router.get("/:id", listarChef)
router.put("/:id", atualizarChef)
router.delete("/:id", deleteChef)

export default router;

