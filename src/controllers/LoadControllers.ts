import { ImportModules } from "../import-modules/ImportModules.js";

export interface Controller {
    create: () => string,
    update: () => string,
    delete: () => string 
}

export async function LoadControllers() {
    const importModules = new ImportModules(import.meta.url);
    const controllers = await importModules.instantiateDefaultsRecord<Controller>();
    console.log(controllers);
}