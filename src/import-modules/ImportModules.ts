import { isConstructible } from "./FilteredDirectoryFiles/utility.js";
import { FilteredDirectoryFiles } from "./FilteredDirectoryFiles/FilteredDirectoryFiles.js";
import { isModuleNamespaceObject } from "util/types";
import path from "path";

type ImportedModule = Record<string, unknown>;

export class ImportModules extends FilteredDirectoryFiles {

    private exclude: string[];
    private extension: string;

    constructor(fileURL: string, extension: string = ".js", exclude: string[] = []) {
        super(fileURL);
        this.exclude = exclude;
        this.extension = extension;
    }

    private async buildFilesPromise() {
        const files = await this.getFilesURL(this.extension, this.exclude);
        const results = await Promise.allSettled(files.map((file): Promise<ImportedModule> => import(file)));
        return { files: files, results: results };
    }

    private async getModulesArray<T>(callBack: (collection: T[], module: ImportedModule) => void): Promise<T[]> {
        const { results } = await this.buildFilesPromise();
        return results.reduce((collection: T[], result, index) => {
            if (result.status === "fulfilled" && isModuleNamespaceObject(result.value)) {
                callBack(collection, result.value);
            }
            return collection;
        }, []);
    }

    private async getModulesRecord<T = unknown>(callBack: (record: Record<string, T>, module: ImportedModule, file: string) => void): Promise<Record<string, T>> {
        const record: Record<string, T> = {};
        const { files, results } = await this.buildFilesPromise();
        results.forEach((result, index) => {
            const filePath = files[index];
            if (!filePath) return;
            const file = path.basename(filePath);
            if (result.status === "fulfilled" && isModuleNamespaceObject(result.value)) {
                if ('default' in result.value) {
                    callBack(record, result.value, file.slice(0, file.lastIndexOf(".")));
                }
            }
        })
        return record;
    }

    getDefaultsAsArray<T = unknown>(exported: string = "default"): Promise<T[]> {
        return this.getModulesArray<T>((array, module) => {
            const exp = module[exported];
            if (exp) array.push(exp as T);
        });
    }

    instantiateDefaultsArray<T = unknown>(args: any[] = [], exported: string = "default"): Promise<T[]> {
        return this.getModulesArray<T>((array, module) => {
            const exp = module[exported];
            if (typeof exp === "function") {
                (isConstructible(exp)) ? array.push(new exp(...args)) : array.push(exp(...args));
            }
        });
    }

    getDefaultsAsRecord<T = unknown>(exported: string = "default"): Promise<Record<string, T>> {
        return this.getModulesRecord<T>((record, module, file) => {
            const exp = module[exported];
            if (exp) record[file] = exp as T;
        });
    }

    instantiateDefaultsRecord<T = unknown>(args: any[] = [], exported: string = "default"): Promise<Record<string, T>> {
        return this.getModulesRecord<T>((record, module, file) => {
            const exp = module[exported];
            if (typeof exp === "function") {
                (isConstructible(exp)) ? record[file] = new exp(...args) : record[file] = exp(...args);
            }
        });
    }

}

