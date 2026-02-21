import fs from "fs";

export interface Config {
  port: number;
  baseUrl: string;
  filePath: string;
}

export function loadConfig(path: string = "src/server/config.json"): Config {
  try {
    const raw = fs.readFileSync(path, "utf-8");
    const config: Config = JSON.parse(raw);
    return config;
  } catch (err) {
    console.error("Erro ao carregar config:", err);
    return {
      port: 7192,
      baseUrl: "/maraskin",
      filePath: "src/files/semana.json"
    };
  }
}
