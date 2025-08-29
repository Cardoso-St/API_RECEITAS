import { Router } from "express";
import { cadastrarChef, listarChef, listarChefs } from "../controllers/chefControllers.js";

const router = Router()

router.post("/", cadastrarChef)
router.get("/", listarChefs)
router.get("/:id", listarChef)

export default router;

