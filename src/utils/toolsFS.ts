import fs from 'fs/promises';
import path from 'path';
import Stats from 'fs';
import { pathToFileURL } from 'url';


export async function leerDirectorio(dir: string): Promise<string[]> {
    let list: string[] = [];
    try {
        const files = await fs.readdir(dir);
        list = files;
    } catch (err) {
        console.error('Error al leer el directorio:', err);
        throw err;
    }
    return list;
}

export async function propiedadesDeArchivo(filePath: string): Promise<Stats.Stats> {
    let propiedades: Stats.Stats = Stats.Stats.prototype;
    try {
        const stat = await fs.stat(filePath);
        propiedades = stat;
    } catch (err) {
        console.error('Error al leer las propiedades del archivo:', err);
        throw err;
    }
    return propiedades;
}

export async function rutasDeArchivos(directorio: string, extension: string, exclude: string[]): Promise<string[]> {
    const lista: string[] = await leerDirectorio(directorio);

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
        } catch (error) {
            console.error(`Error procesando ${filePath}:`, error);
        }
        return []; // Retorna un array vacío si no se cumplen las condiciones o hay un error
    });

    const resultadosAnidados = await Promise.all(promesas);

    // Aplanar el array de arrays para obtener un solo array de strings
    return resultadosAnidados.flat();
}

export const obtenerExportDefault = async <T>(filePath: string): Promise<T> => {
    const fileUrl = pathToFileURL(filePath).href;
    try {
        const module = await import(fileUrl) as { default: T };
        if (module.default === undefined) {
            throw new Error(`El módulo en ${filePath} no tiene una exportación por defecto.`);
        } else {
            return module.default;
        }
    } catch (error) {
        throw new Error(`Error al importar el módulo desde ${filePath}: ${error}`);
    }
}


export const obtenerExportDefaultsDelDirectorio = async <T>(dir: string, ext: string, exclude: string[]): Promise<T[]> => {
    const files: string[] = await rutasDeArchivos(dir, ext, exclude);
    return Promise.all(files.map(obtenerExportDefault<T>));
}
