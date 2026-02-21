import type { Almoco } from "./almoco";
import type { Turno } from "./turno";

export interface Dia {
  diaNome: string;
  almoco: Almoco
  manha: Turno;
  tarde: Turno;
  noite: Turno;
}
