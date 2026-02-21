const express = require("express");
import type e = require("express");
import type { Semana } from "../models/semana.js";
const fs = require('fs');
const app = express();
const PORT: number = 7192;
const FILE: string = "src/cardapio.json";

app.use(express.json());

app.post("/maraskin", (req: any, res: any) => {
  const semana: Semana = req.body; // assume que o body segue a interface Semana

  try {
    fs.writeFileSync(FILE, JSON.stringify(semana, null, 2), "utf-8");
    res.status(200).send("Semana atualizada com sucesso!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao salvar o cardápio");
  }
});

app.get("/maraskin", (req: any, res: any) => {
})

app.put("/maraskin/segunda", (req: any, res: any) => {
  res.send("hello!");
});

app.put("/maraskin/terca", (req: any, res: any) => {
  res.send("hello post!");
});

app.put("/maraskin/quarta", (req: any, res: any) => {
  res.send("hello post!");
});

app.put("/maraskin/quinta", (req: any, res: any) => {
  res.send("hello post!");
});

app.put("/maraskin/sexta", (req: any, res: any) => {
  res.send("hello post!");
});

app.listen(PORT, () => {
  console.log("running nodemaraskin!");
});
