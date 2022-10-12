import express from "express";
import db from "./config/dbConnect.js";
import routes from "./routes/index.js"

//aplicando conexao com o banco
db.on("error", console.log.bind(console,'Erro de conexao'));
db.once("open", () => {
    console.log("conexao com o banco feita com sucesso!")
});

const app = express();

//faz a interpretacao do envio no postman e transforma em um objeto js
app.use(express.json());

routes(app);


export default app;