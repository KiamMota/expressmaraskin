import jwt from "jsonwebtoken";
import app from "./app.ts"


const JWT_SECRET = "super_secret_da_escola";

app.post("/login", (req, res) => {
  const { nome, senha } = req.body;

  const login = loginCached; // já carregado do JSON

  if (nome !== login.nome || senha !== login.senha) {
    return res.status(401).json({ error: "Credenciais inválidas" });
  }

  const token = jwt.sign(
    { nome },
    JWT_SECRET,
    { expiresIn: "8h" }
  );

  res.json({ token });
});
