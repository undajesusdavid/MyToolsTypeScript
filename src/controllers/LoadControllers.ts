import { ProcessImportModules } from "../import-modules/proces-import/ProcessImportModules.js";

export interface Controller {
    create: () => string,
    update: () => string,
    delete: () => string 
}

export async function LoadControllers() {
    const importModules = new ProcessImportModules(import.meta.url);
    const controllers = await importModules.instantiateDefaultsRecord<Controller>();
    console.log(controllers);
}