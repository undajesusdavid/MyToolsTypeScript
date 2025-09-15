import Module from "module";
import { FilteredDirectoryFiles } from "./FilteredDirectoryFiles/FilteredDirectoryFiles.js";

export class ImportModules extends FilteredDirectoryFiles {

    constructor(fileURL: string) {
        super(fileURL)
    }

    async getModulesJS(exclude?: string[]) {
        let modules = [];
        const files = await this.getFilesURL(".js", exclude);
        const task = Promise.allSettled(files.map(async (file): Promise<Module> => await import(file)));
        const results = await task;
        results.forEach((result) => {
            if (result.status === "fulfilled" && result.value) {
                modules.push()
            }
        })

        return modules;
    }



}