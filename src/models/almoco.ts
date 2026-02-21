import type { Refeicao } from "./refeicao";

export interface Almoco {
  almoco: Refeicao;
  acompanhamento: Refeicao | null;
}
