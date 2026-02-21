import app, { semanaCached } from "./state.ts";
import { autenticar, verificarToken } from "./auth.ts";
import type { Semana } from "./models/semana.ts";
import type { ResultDto } from "../models/resultdto.ts";
import { SemanaController } from "./controllers/semanaController.ts";

function makeResult(data: object, message: string, success = true): ResultDto {
  return { data, message, sucess: success };
}

const semanaCtrl = new SemanaController(semanaCached);
semanaCtrl.registerRoutes(app, "/maraskin")

// LOGIN
app.post("/maraskin/login", (req, res) => {
  try {
    const token = autenticar(req.body.nome, req.body.senha);
    res.json(makeResult({ token }, "Login realizado com sucesso"));
  } catch (err) {
    res.status(401).json(makeResult({}, (err as Error).message, false));
  }
});


app.get("/maraskin/terca", (req, res) => {
  try {
    res.send(makeResult(semanaCached.terca, "ok", true))
  }
  catch (err) {
    res.status(401).json(makeResult({}, (err as Error).message, false))
  }
})

// PUT SEGUNDA-FEIRA
app.put("/maraskin/segunda", (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json(makeResult({}, "Token ausente", false));

    const token = authHeader.split(" ")[1];
    verificarToken(token); // lança erro se inválido

    const semana: Semana = semanaCtrl.ler();
    semana.segunda = req.body.segunda;
    semanaCtrl.salvar(semana);

    res.json(makeResult({ segunda: semana.segunda }, "Segunda-feira atualizada com sucesso"));
  } catch (err) {
    res.status(400).json(makeResult({}, (err as Error).message, false));
  }
});
