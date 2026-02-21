import fs from "fs";
import path from "path";

export interface MaraskinConfig {
  port: number;
  baseUrl: string;
  loginPath: string;
  semanaPath: string;
}

export function maraskinPrint(str: string, path: string = "src/server/base.ts"): void {
  console.log(`>> [${path}] ${str}`);
}
export function lerSemanaDoFileSystem(path: string = "src/files/semana.json"): string {
  return fs.readFileSync(path, "utf-8")
}

export function lerLoginDoFileSystem(
  path: string = "src/files/login.json"
): string {
  const data = fs.readFileSync(path, "utf-8");
  maraskinPrint('login.json lido com sucesso.');
  return data;
}


export function loadConfig(
  configPath: string = "src/server/config.json"
): MaraskinConfig {

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
  maraskinPrint("configuração do servidor lida e carreagada.")

  return config;
}
