import jwt from "jsonwebtoken";
import { loginCached } from "./state.ts";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

export function autenticar(nome: string, senha: string): string {
  if (!nome || !senha) {
    throw new Error("Nome e senha obrigatórios");
  }

  if (nome !== loginCached.nome || senha !== loginCached.senha) {
    throw new Error("Credenciais inválidas"); // <--- ESSA LINHA
  }
  console.log("token criado!")
  const token = jwt.sign(
    { nome },
    JWT_SECRET,
    { expiresIn: "8h" }
  );

  return token;
}
/**
 * Verifica se o token JWT é válido.
 * @param token O token JWT recebido do cliente
 * @throws Lança um erro se o token for inválido ou expirado
 */
export function verificarToken(token: string): void {
  if (!token) {
    throw new Error("Token ausente");
  }

  try {
    // jwt.verify lança erro se inválido ou expirado
    jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new Error("Token inválido ou expirado");
  }
}
