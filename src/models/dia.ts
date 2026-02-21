import type { Almoco } from "./almoco.js";
import type { Turno } from "./turno.js";

export interface Dia {
  diaNome: string;
  almoco: Almoco;
  manha: Turno;
  tarde: Turno;
  noite: Turno;
}
