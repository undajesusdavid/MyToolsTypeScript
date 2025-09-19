import path from "path";
import fs from "fs/promises";
import { fileURLToPath, pathToFileURL } from 'url';
import * as myErrors from "../Errors/Errors.js";
import type { Dirent } from "fs";

export class FilteredDirectoryFiles {
    protected dirPathSystem: string;
    protected fileExclude: string;

    constructor(fileURL: string) {
        const {dirPathSystem, fileExclude} = this.parseURL(fileURL);
        this.dirPathSystem = dirPathSystem;
        this.fileExclude = fileExclude;
    }

    private parseURL(fileURL: string) {
        if (!fileURL || typeof fileURL !== 'string') {
            throw new myErrors.ErrorInvalidURL(fileURL, "La URL proporcionada está vacía o no es una cadena.");
        }
        try {
            // Usamos path.dirname y path.basename que son más declarativos y seguros
            const pathSystem = fileURLToPath(fileURL);
            const dirPathSystem = path.dirname(pathSystem);
            const fileExclude = path.basename(pathSystem);

            return {dirPathSystem, fileExclude};
        } catch (e) {
            if (e instanceof Error && 'code' in e) {
                if (e.code === "ERR_INVALID_URL") {
                    throw new myErrors.ErrorInvalidURL(fileURL, "el formato no es una URL valida");
                }
            }
            throw new myErrors.UnknownError(e, "generado en la funcion parseURL ");
        }
    }

    private filterFiles(files: Dirent[], extension: string, exclude: string[]): Dirent[] {
        const excludeSet = new Set([...exclude, this.fileExclude]);
        return files.filter(dirent =>
            dirent.isFile() &&
            dirent.name.endsWith(extension) &&
            !excludeSet.has(dirent.name) &&
            !dirent.name.startsWith(".")
        );
    }

    private async getFiles(extension: string, exclude?: string[], callBack?: (files: Dirent[]) => string[]): Promise<string[]> {
        if (!/^\.[a-zA-Z]+$/.test(extension)) {
            throw new myErrors.InvalidExtension(extension);
        }
        try {
            const dirents = await fs.readdir(this.dirPathSystem, { recursive: true, withFileTypes: true });
            const filteredDirents = this.filterFiles(dirents, extension, exclude || []);
            if (callBack) {
                return callBack(filteredDirents);
            } else {
                return filteredDirents.map(dirent => dirent.name);
            }

        } catch (e) {
            if (e instanceof Error && 'code' in e) {
                if (e.code === "ENOENT") throw new myErrors.DirectoryDoesNotExist(this.dirPathSystem);
                if (e.code === "EACCES") throw new myErrors.WithoutDirectoryPermissions(this.dirPathSystem);
                if (e.code === "ENOTDIR") throw new myErrors.DirectoryPointsToFile(this.dirPathSystem);
            }

            throw new myErrors.UnknownError(e, "generado en la funcion getFiles");
        }
    }

    async getFileNames(ext: string, exclude?: string[]): Promise<string[]> {
        return this.getFiles(ext, exclude);
    }

    async getFilesPath(ext: string, exclude?: string[]): Promise<string[]> {
        return this.getFiles(ext, exclude, (dirents) => {
            return dirents.map(file => path.join(file.parentPath, file.name));
        })
    }

    async getFilesURL(ext: string, exclude?: string[]): Promise<string[]> {
        return this.getFiles(ext, exclude, (dirents) => {
            return dirents.map(file =>  pathToFileURL(path.join(file.parentPath, file.name)).href);
        })
    }
}