import path from "path";
import { fileURLToPath } from "url";
import { obtenerExportDefaultsDelDirectorio } from "../utils/toolsFS.js";
import type { Router } from "express";

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = path.dirname(__filename);


export const RouterApi = async () : Promise<Router[]> => {
    return await obtenerExportDefaultsDelDirectorio<Router>(__dirname, ".js", ["index.js"]);
};

