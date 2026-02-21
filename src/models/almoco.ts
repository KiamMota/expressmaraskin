import type { Refeicao } from "./refeicao.js";

export interface Almoco {
  almoco: Refeicao;
  acompanhamento: Refeicao | null;
}
