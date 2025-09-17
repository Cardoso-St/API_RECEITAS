import express, { response } from "express";
import cors from "cors";
import { conn } from "./config/sequelize.js";

//tabelas
import chefModel from "./models/chefModel.js";

//ROTAS
import chefRoutes from "./routes/chefRoutes.js"
import receitasRouter from "./routes/receitasRoutes.js"

const app = express();

app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
        credentials: true,
    })
);

app.use(express.json())

conn.sync()
.then(() => {
    console.log("Banco de dados conectado🍆")
})
.catch((error) => console.log(error))

app.use("/api/chefs", chefRoutes)
app.use("/api/receitas", receitasRouter)

export default app;