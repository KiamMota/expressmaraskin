import type { Semana, Dia } from "./models/semana.ts";
import type { ResultDto } from "./models/resultDto.ts";
import express from "express";

export class SemanaController {
  private semana: Semana;

  constructor(semana: Semana) {
    this.semana = semana;
  }

  private makeResult(data: object, message = "ok", success = true): ResultDto {
    return { data, message, sucess: success };
  }

  public registerRoutes(app: express.Application, baseUrl: string) {
    app.get(`${baseUrl}/semana`, this.getSemana.bind(this));
    app.get(`${baseUrl}/segunda`, this.getDia.bind(this, "segunda"));
    app.get(`${baseUrl}/terca`, this.getDia.bind(this, "terca"));
    app.get(`${baseUrl}/quarta`, this.getDia.bind(this, "quarta"));
    app.get(`${baseUrl}/quinta`, this.getDia.bind(this, "quinta"));
    app.get(`${baseUrl}/sexta`, this.getDia.bind(this, "sexta"));
  }

  private getSemana(req: express.Request, res: express.Response) {
    try {
      res.json(this.makeResult(this.semana));
    } catch (err) {
      res.status(500).json(this.makeResult({}, (err as Error).message, false));
    }
  }

  private getDia(diaNome: keyof Semana, req: express.Request, res: express.Response) {
    try {
      const dia: Dia = this.semana[diaNome];
      res.json(this.makeResult(dia));
    } catch (err) {
      res.status(500).json(this.makeResult({}, (err as Error).message, false));
    }
  }
}
