import jwt from "jsonwebtoken";
import { loginCached } from "./state.ts";
import { Token } from "../models/login.js";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

export function autenticar(nome: string, senha: string): string {
  if (!nome || !senha) {
    throw new Error("Nome e senha obrigatórios");
  }

  if (nome !== loginCached.nome || senha !== loginCached.senha) {
  }

  const token = jwt.sign(
    { nome },
    JWT_SECRET,
    { expiresIn: "8h" }
  );

  return token;
}
