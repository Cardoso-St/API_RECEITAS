import express, { response } from "express";
import cors from "cors";
import { conn } from "./config/sequelize.js";

//tabelas
import chefModel from "./models/chefModel.js";

//ROTAS
import chefRoutes from "./routes/chefRoutes.js"

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

app.get("/", (resquest, response) => {
        response.status(200).json({ mensagem: "olá mundo" })
    })

export default app;