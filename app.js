const express = require("express");
const users = require("./data/userData.json");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

const dataPath = path.join(__dirname, "data", "userData.json");

app.get("/", async (req, res) => {
   try {
      const dados = await fs.readFile(dataPath, "utf-8");
      const users = JSON.parse(dados);
      res.status(200).json({usuarios: users});
   } catch (err) {
       res.status(500).json({ error: err.message});
   }
})

app.post("/", (req, res) => {
    try {
        const { id, nome, idade, email } = body.params
    } catch (err) {
        res.status(500).json({error: err.message});
    }
})

app.listen(8000, () => {
    console.log("rodando na porta 8000");
})

