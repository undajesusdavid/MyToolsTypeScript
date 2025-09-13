import path from "path";
import { fileURLToPath } from "url";


const prefijoDeError = "Error de BuildDirectoryPath:";

export async function normalizarRutaDelDirectorio(directoryFile: string) {
    const messageError = " El directorio proporcionado no es valido";
    if (!directoryFile || directoryFile === "" || typeof directoryFile !== 'string') {
        throw new Error(`${prefijoDeError} ${messageError}, no cumple con los parametros de la funcion ${arguments.callee.name} `);
    }

    try {
        const formatoDelSitemaOperativo = fileURLToPath(directoryFile);
        return path.dirname(formatoDelSitemaOperativo);
    } catch (error: any) {
        if (error.code === "ERR_INVALID_URL") {
           throw new TypeError(`${prefijoDeError} ${messageError}, no cumple con los parametros de la funcion ${fileURLToPath.name} `);
        }else{
            throw error;
        }
    }

}

