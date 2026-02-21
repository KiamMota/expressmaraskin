import type { Dia } from "./dia.ts";
import type { Refeicao } from "./refeicao.ts";
import type { Semana } from "./semana.ts";
import type { Turno } from "./turno.ts";

function refeicaoVazia(): Refeicao {
  return { nome: "", calorias: 0 };
}

/** cria um turno vazio */
function turnoVazio(): Turno {
  return { merenda: [] };
}

/** cria um dia vazio */
function diaVazio(): Dia {
  return {
    diaNome: "",
    almoco: { almoco: refeicaoVazia(), acompanhamento: null },
    manha: turnoVazio(),
    tarde: turnoVazio(),
    noite: turnoVazio(),
  };
}

export function semanaVazia(): Semana {
  return {
    segunda: diaVazio(),
    terca: diaVazio(),
    quarta: diaVazio(),
    quinta: diaVazio(),
    sexta: diaVazio(),
  };
}
