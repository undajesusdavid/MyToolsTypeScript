import Module from "module";
import { isConstructible } from "./FilteredDirectoryFiles/utility.js";
import { FilteredDirectoryFiles } from "./FilteredDirectoryFiles/FilteredDirectoryFiles.js";
import { isModuleNamespaceObject } from "util/types";

export class ImportModules extends FilteredDirectoryFiles {

    private exclude: string[];

    constructor(fileURL: string, exclude: string[] = [],) {
        super(fileURL);
        this.exclude = exclude;
    }

    protected async getModulesJSReduce<T>(callBack: (collection: T[], module: Module, file: string) => void): Promise<T[]> {
        const files = await this.getFilesURL(".js", this.exclude);
        const results = await Promise.allSettled(files.map((file): Promise<Module> => import(file)));
        return results.reduce((collection: T[], result, index) => {
            if (result.status === "fulfilled" && isModuleNamespaceObject(result.value)) {
                const file = files[index] as string;
                callBack(collection, result.value, file);
            }
            return collection;
        }, []);
    }


    async arrayDefaultExport<T = unknown>(): Promise<T[]> {
        return await this.getModulesJSReduce<T>((collection, module) => {
            if ('default' in module) {
                collection.push(module.default as T);
            }
        });
    }

    async arrayInstanceDefaultExports<T = unknown>(args: any[] = []): Promise<T[]> {
        return await this.getModulesJSReduce<T>((collection, module) => {
            if ('default' in module) {
                if ("default" in module && typeof module.default === "function") {
                    const def = module.default;
                    if (isConstructible(def)) {
                        collection.push(new def(...args));
                    } else {
                        collection.push(def(...args));
                    }
                }
            }
        });
    }
}

