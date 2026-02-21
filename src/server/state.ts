import express from "express"
import { lerLoginDoFileSystem, lerSemanaDoFileSystem, loadConfig, type MaraskinConfig } from "./base.ts";
import type { Login } from "../models/login.ts";
import type { Semana } from "../models/semana.js";

export const configCached: MaraskinConfig = loadConfig();
export const loginCached: Login = lerLoginDoFileSystem(configCached.loginPath)
export const semanaCached: Semana = lerSemanaDoFileSystem(configCached.semanaPath)

const app = express();
app.use(express.json());

app.listen(configCached.port)
console.log(`>> PRONTO! servidor ouvindo na porta ${configCached.port}`)

export default app;
