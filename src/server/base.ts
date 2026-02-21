import fs from "fs";
import path from "path";
import type { Semana } from "../models/semana.js";
import type { Login } from "../models/login.js";

export interface MaraskinConfig {
  port: number;
  baseUrl: string;
  loginPath: string;
  semanaPath: string;
}


function maraskinPrint(str: string, path: string = "src/server/base.ts"): void {
  console.log(`>> [${path}] ${str}`);
}
export function lerSemanaDoFileSystem(
  path: string = "src/files/semana.json"
): Semana {
  const raw = fs.readFileSync(path, "utf-8");
  let parsed: unknown;

  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error("semana.json contém JSON inválido");
  }

  if (typeof parsed !== "object" || parsed === null) {
    throw new Error("Estrutura de semana inválida");
  }

  return parsed as Semana;
}

export function lerLoginDoFileSystem(
  path: string = "src/files/login.json"
): Login {
  const raw = fs.readFileSync(path, "utf-8");

  let parsed: unknown;

  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error("login.json contém JSON inválido");
  }

  maraskinPrint("login.json lido e parseado com sucesso.");

  return parsed as Login;
}

function ensureConfig(
  confDir: string = "src/files"
): void {
  const configPath = path.join(confDir, "config.json");
  const filesDir = path.resolve("src/files/");

  // garante diretórios
  fs.mkdirSync(confDir, { recursive: true });
  fs.mkdirSync(filesDir, { recursive: true });

  // cria config.json se não existir
  if (!fs.existsSync(configPath)) {
    const defaultConfig = {
      port: 7192,
      baseUrl: "/maraskin",
      loginPath: "src/files/login.json",
      semanaPath: "src/files/semana.json"
    };

    fs.writeFileSync(
      configPath,
      JSON.stringify(defaultConfig, null, 2)
    );
  }

  const loginPath = path.join(filesDir, "login.json");
  if (!fs.existsSync(loginPath)) {
    fs.writeFileSync(loginPath, "{}");
  }

  const semanaPath = path.join(filesDir, "semana.json");
  if (!fs.existsSync(semanaPath)) {
    fs.writeFileSync(semanaPath, "{}");
  }
}

export function loadConfig(
  configPath: string = "src/server/config.json"
): MaraskinConfig {

  ensureConfig()
  if (!fs.existsSync(configPath)) {
    throw new Error(`>> src / server / base.ts: arquivo de configuração não encontrado: ${configPath}`);
  }

  const raw = fs.readFileSync(configPath, "utf-8");

  let parsed: unknown;

  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error("config.json contém JSON inválido");
  }

  if (
    typeof parsed !== "object" ||
    parsed === null ||
    typeof (parsed as any).port !== "number" ||
    typeof (parsed as any).baseUrl !== "string" ||
    typeof (parsed as any).loginPath !== "string" ||
    typeof (parsed as any).semanaPath !== "string"
  ) {
    throw new Error("config.json está com formato inválido");
  }

  const config = parsed as MaraskinConfig;

  config.loginPath = path.resolve(config.loginPath);
  config.semanaPath = path.resolve(config.semanaPath);

  if (!fs.existsSync(config.loginPath)) {
    throw new Error(`Arquivo login não encontrado: ${config.loginPath}`);
  }

  if (!fs.existsSync(config.semanaPath)) {
    throw new Error(`Arquivo semana não encontrado: ${config.semanaPath}`);
  }
  maraskinPrint("configuração do servidor lida e carregada.")

  return config;
}
