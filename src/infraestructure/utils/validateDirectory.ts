import fs from 'fs/promises';
//import path from 'path';

const prefijoDeError = "Error de validacion de directorio:";

export async function obtenerPermisos(dir: string): Promise<{ lectura: boolean; escritura: boolean }> {
    const resultado = { lectura: true, escritura: true };
    try {
        await fs.access(dir, fs.constants.R_OK);
    } catch (error) {
        resultado.lectura = false;
    }
    try {
        await fs.access(dir, fs.constants.W_OK);
    } catch (error) {
        resultado.escritura = false;
    }

    return resultado;
}


export async function comprobarDirectorio(dir: string) {
    if (!dir || dir === "" || typeof dir !== 'string') {
        throw new Error(`${prefijoDeError} El directorio no es una cadena valida.`);
    } 
    const permisos = await obtenerPermisos(dir);
    if (!permisos.lectura) throw new Error(`${prefijoDeError} El directorio ${dir} no tiene permisos de lectura`);
    if (!permisos.escritura) throw new Error(`${prefijoDeError} El directorio ${dir} no tiene permisos de escritura`);

    return true;
}