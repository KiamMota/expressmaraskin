
import express from "express"
import { lerLoginDoFileSystem, lerSemanaDoFileSystem, loadConfig, type MaraskinConfig } from "./base.js";
import type { Login } from "../models/login.ts";

export const configCached: MaraskinConfig = loadConfig();
const loginCached: Login = lerLoginDoFileSystem(configCached.loginPath)

const app = express();
app.use(express.json());

app.listen(configCached.port)
console.log(`>> PRONTO! servidor ouvindo na porta ${configCached.port}`)

export default app;
