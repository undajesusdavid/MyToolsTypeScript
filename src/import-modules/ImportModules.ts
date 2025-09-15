import path from "path";
import { fileURLToPath } from 'url';
import { ErrorInvalidURL, UnknownError } from "./Errors.js"; // Suponiendo que estos errores existen

export class ImportModules {
    protected dirPathSystem: string;
    protected fileExclude: string;

    private constructor(dirPathSystem: string, fileExclude: string) {
        this.dirPathSystem = dirPathSystem;
        this.fileExclude = fileExclude;
    }

    static create(fileURL: string) {
        if (!fileURL || typeof fileURL !== 'string') {
            throw new ErrorInvalidURL("La URL proporcionada está vacía o no es una cadena.");
        }
        try {
            // Usamos path.dirname y path.basename que son más declarativos y seguros
            const pathSystem = fileURLToPath(fileURL);
            const dirPathSystem = path.dirname(pathSystem);
            const fileExclude = path.basename(pathSystem);

            return new ImportModules(dirPathSystem, fileExclude);
        } catch (e) {
            if (e instanceof TypeError || e instanceof URIError) {
                throw new ErrorInvalidURL("La URL proporcionada no es válida.");
            }
            // Incluimos el error original para facilitar la depuración
            throw new UnknownError(`Error desconocido al instanciar ImportModules: ${e}`);
        }
    }

    protected filterFiles(){
        // Contruir funcion para filtrar los que no quiero que incluya
    }

    getAllFiles(){
        // Contruie funcion que permita obtener todos lo archivos del directorio
    }

}