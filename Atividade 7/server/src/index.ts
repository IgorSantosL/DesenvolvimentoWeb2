import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mega from "./routes/rotas";

dotenv.config();

const app = express();

app.use(cors());

const PORT = process.env.PORT;

app.listen(PORT, function () {
    console.log(`Rodando em http://localhost:${PORT}`);
});

app.use(mega);