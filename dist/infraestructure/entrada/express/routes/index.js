import path from "path";
import { fileURLToPath } from "url";
import { obtenerExportDefaultsDelDirectorio } from "../../../utils/toolsFS.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const RouterApi = async () => {
    return await obtenerExportDefaultsDelDirectorio(__dirname, ".js", ["index.js"]);
};
