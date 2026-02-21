import express from "express";
import fs from "fs";
import { lerLoginDoFileSystem, loadConfig, type MaraskinConfig } from "./base.ts";
import type { Semana } from "../models/semana.ts";

const configCached: MaraskinConfig = loadConfig();
const loginCached: string = lerLoginDoFileSystem(configCached.loginPath)
const app = express();
app.use(express.json());

app.listen(configCached.port)
console.log(`>> PRONTO! servidor ouvindo na porta ${configCached.port}`)
