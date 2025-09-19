import express, { response } from "express";
import cors from "cors";
import { conn } from "./config/sequelize.js";
import path from "node:path";
import { fileURLToPath } from "node:url";


//tabelas
import chefModel from "./models/chefModel.js";

//ROTAS
import chefRoutes from "./routes/chefRoutes.js"
import receitasRouter from "./routes/receitasRoutes.js"

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(path.join(__dirname, "../public")));


conn.sync()
.then(() => {
    console.log("Banco de dados conectado🍆")
})
.catch((error) => console.log(error))

app.use("/api/chefs", chefRoutes)
app.use("/api/receitas", receitasRouter)

export default app;
