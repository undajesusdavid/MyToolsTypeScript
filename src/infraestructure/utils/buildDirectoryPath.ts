import path from "path";
import { fileURLToPath } from "url";


const prefijoDeError = "Error de BuildDirectoryPath:";

export async function normalizarRutaDelDirectorio(directoryFile: string) {
    if (!directoryFile || directoryFile === "" || typeof directoryFile !== 'string') {
        throw new Error(`${prefijoDeError} El directorio no es una cadena valida.`);
    }

    try {
        const formatoDelSitemaOperativo = fileURLToPath(directoryFile)
        return path.dirname(formatoDelSitemaOperativo);
    } catch (error: any) {
        if (error.code === "ERR_INVALID_URL") {
            console.error(`${prefijoDeError} la direccion proporcionada es invalida, no cumple con los parametros de la funcion fileURLToPath`);
        }  
        throw error;

    }

}

