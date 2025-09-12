import fs from 'fs/promises';
import path from 'path';
import Stats from 'fs';
import { pathToFileURL } from 'url';
import { comprobarDirectorio } from './validateDirectory.js';
export async function obtenerRutasDeDirectorio(dir) {
    try {
        return comprobarDirectorio(dir).then(() => fs.readdir(dir));
    }
    catch (error) {
        console.error(`Funcion leer Directorio: ${error}`);
        throw error;
    }
}
export async function propiedadesDeArchivo(filePath) {
    let propiedades;
    try {
        propiedades = await fs.stat(filePath);
    }
    catch (err) {
        console.error('Error al leer las propiedades del archivo:', err);
        throw err;
    }
    return propiedades;
}
export async function rutasDeArchivos(directorio, extension, exclude) {
    const lista = await obtenerRutasDeDirectorio(directorio);
    // Usar Promise.all para procesar los archivos en paralelo
    const promesas = lista.map(async (file) => {
        const filePath = path.join(directorio, file);
        try {
            const propiedades = await propiedadesDeArchivo(filePath);
            if (propiedades.isDirectory()) {
                // Ignorar directorios que comienzan con '.'
                if (file.startsWith('.')) {
                    return [];
                }
                return await rutasDeArchivos(filePath, extension, exclude);
            }
            // Procesar solo archivos
            if (propiedades.isFile()) {
                const esOculto = file.startsWith('.');
                const esExcluido = exclude.includes(file);
                const esExtensionElegida = path.extname(filePath) === extension;
                if (!esOculto && !esExcluido && esExtensionElegida) {
                    return [filePath];
                }
            }
        }
        catch (error) {
            console.error(`Error procesando ${filePath}:`, error);
        }
        return []; // Retorna un array vacío si no se cumplen las condiciones o hay un error
    });
    const resultadosAnidados = await Promise.all(promesas);
    // Aplanar el array de arrays para obtener un solo array de strings
    return resultadosAnidados.flat();
}
export const obtenerExportDefaultsDelDirectorio = async (dir, ext, exclude, args) => {
    const files = await rutasDeArchivos(dir, ext, exclude);
    return Promise.all(files.map(async (filePath) => {
        const fileUrl = pathToFileURL(filePath).href;
        try {
            const module = await import(fileUrl);
            if (module.default === undefined) {
                throw new Error(`El módulo en ${filePath} no tiene una exportación por defecto.`);
            }
            else if (typeof module.default === "function") {
                return (args && args.length > 0) ? module.default(...args) : module.default;
            }
            else {
                return module.default;
            }
        }
        catch (error) {
            console.error(`Error al intentar obtener el exportDefault del archivo:${path.basename(filePath)}`);
            throw new Error(`Error al importar el módulo desde ${path.basename(filePath)}: ${error}`);
        }
    }));
};
