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
    const dados = await fs.readFile(dataPath, "utf-8", (err, data) => {
      if (err) {
        return res.status(500).json({ error: "Erro ao ler os dados" });
      }
      res.status(200).json(JSON.parse(data));
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/", (req, res) => {
  try {
    const newUser = req.body;

    fs.readFile(dataPath, "utf-8", (err, data) => {
      if (err) {
        return res.status(500).json({ error: "Erro ao ler os dados" });
      }

      let users = [];

      try {
        users = JSON.parse(data);
      } catch (parseErr) {
        return res.status(500).json({ error: "Erro ao analisar os dados" });
      }

      users.push(newUser);

      fs.writeFile(dataPath, JSON.stringify(users, null, 2), (writeErr) => {
        if (writeErr) {
          return res.status(500).json({ error: "Erro ao salvar os dados" });
        }
        res.status(201).json(newUser);
      });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/:id", (req, res) => {
  const userId = req.params.id;
  fs.readFile(dataPath, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao ler os dados" });
    }

    let users = [];

    try {
      users = JSON.parse(data);
    } catch (parseErr) {
      return res.status(500).json({ error: "Erro ao analisar os dados" });
    }

    const updatedUsers = users.filter((user) => String(user.id) !== String(userId));

    fs.writeFile(
      dataPath,
      JSON.stringify(updatedUsers, null, 2),
      (writeErr) => {
        if (writeErr) {
          return res.status(500).json({ error: "Erro ao salvar os dados" });
        }
        res.status(200).json({ message: "Usuário deletado com sucesso" });
      }
    );
  });
});

app.listen(8000, () => {
  console.log("rodando na porta 8000");
});
