import { FilteredDirectoryFiles } from "../import-modules/FilteredDirectoryFiles/FilteredDirectoryFiles.js";
import { ImportModules } from "../import-modules/ImportModules.js";
export async function LoadControllers() {
    const importModules = new ImportModules("file:///C:/Users/USUARIO/Desktop/MyToolsTypeScript/dist/pruebas/LoadModules.js");
    console.log(await importModules.getModulesJS());
}