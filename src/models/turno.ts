import type almoco = require("./almoco.js");
import type { Refeicao } from "./refeicao.ts";

export interface Turno {
  nome: string;
  merenda: Refeicao;
}
