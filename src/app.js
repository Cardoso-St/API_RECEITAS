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
import usuarioRouter from "./routes/usuarioRoutes.js"
import authRouter from "./routes/authRoutes.js"
import favoritasRouter from "./routes/favoritasRoutes.js"
import curtidasRouter from "./routes/curtidasRoutes.js"
import comentariosRouter from "./routes/comentariosRoutes.js";


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
app.use("/api/usuarios", usuarioRouter)
app.use("/api/auth", authRouter)
app.use("/api/favoritas", favoritasRouter);
app.use("/api/curtidas", curtidasRouter);
app.use("/api/comentarios", comentariosRouter);

export default app;
