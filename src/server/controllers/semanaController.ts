import jwt from "jsonwebtoken";
import fs from "fs";
import type express from "express";
import type { Semana, Dia } from "./models/semana.ts";
import type { ResultDto } from "./models/resultDto.ts";
import { JWT_SECRET } from "../state.ts";


export class SemanaController {
  private semana: Semana;
  private filePath: string;

  constructor(semana: Semana, filePath: string) {
    this.semana = semana;
    this.filePath = filePath;
  }

  private makeResult(data: object, message = "ok", success = true): ResultDto {
    return { data, message, sucess: success };
  }

  public registerRoutes(app: express.Application, baseUrl: string) {
    // GETs
    app.get(`${baseUrl}/semana`, this.getSemana.bind(this));
    app.get(`${baseUrl}/segunda`, this.getDia.bind(this, "segunda"));
    app.get(`${baseUrl}/terca`, this.getDia.bind(this, "terca"));
    app.get(`${baseUrl}/quarta`, this.getDia.bind(this, "quarta"));
    app.get(`${baseUrl}/quinta`, this.getDia.bind(this, "quinta"));
    app.get(`${baseUrl}/sexta`, this.getDia.bind(this, "sexta"));

    // PUTs protegidos
    app.put(`${baseUrl}/segunda`, this.putDia.bind(this, "segunda"));
    app.put(`${baseUrl}/terca`, this.putDia.bind(this, "terca"));
    app.put(`${baseUrl}/quarta`, this.putDia.bind(this, "quarta"));
    app.put(`${baseUrl}/quinta`, this.putDia.bind(this, "quinta"));
    app.put(`${baseUrl}/sexta`, this.putDia.bind(this, "sexta"));
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

  private putDia(diaNome: keyof Semana, req: express.Request, res: express.Response) {
    try {
      // 1. Checa token
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).json(this.makeResult({}, "Token ausente", false));
      }

      const token = authHeader.split(" ")[1];
      try {
        jwt.verify(token, JWT_SECRET);
      } catch {
        return res.status(403).json(this.makeResult({}, "Token inválido", false));
      }

      // 2. Atualiza o cache
      this.semana[diaNome] = req.body;

      // 3. Salva no arquivo
      fs.writeFileSync(this.filePath, JSON.stringify(this.semana, null, 2), "utf-8");

      // 4. Retorna resultado
      res.json(this.makeResult({ [diaNome]: this.semana[diaNome] }, `${diaNome} atualizada com sucesso`));
    } catch (err) {
      res.status(500).json(this.makeResult({}, (err as Error).message, false));
    }
  }
}
