import fs from "fs";
import type { Semana } from "./models/semana.ts";
import { semanaVazia } from "../models/mapper.ts";

let semanaLock = false;

export function ModificarSemana(
  path: string = "src/files/semana.json"
): { ler: () => Semana; salvar: (novaSemana: Semana) => void } {
  return {
    ler: () => {
      const raw = fs.readFileSync(path, "utf-8").trim();
      if (!raw) return {} as Semana; // semana vazia se JSON estiver vazio
      return JSON.parse(raw) as Semana;
    },

    salvar: (novaSemana: Semana) => {
      if (semanaLock) {
        throw new Error("O arquivo de semana está sendo modificado no momento.");
      }

      try {
        semanaLock = true;
        fs.writeFileSync(path, JSON.stringify(novaSemana, null, 2), "utf-8");
      } finally {
        semanaLock = false;
      }
    },
  };
}
export function criarSemanaVaziaJson(path: string = "src/files/semana.json"): void {
  const semana: Semana = semanaVazia();       // gera a semana vazia
  const json = JSON.stringify(semana, null, 2); // transforma em JSON legível
  fs.writeFileSync(path, json, "utf-8");        // escreve no filesystem
  console.log(`Semana vazia criada em: ${path}`);
}
