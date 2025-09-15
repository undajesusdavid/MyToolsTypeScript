import { FilteredDirectoryFiles } from "../import-modules/FilteredDirectoryFiles/FilteredDirectoryFiles.js";

export async function LoadControllers() {
    const directoryFilter = FilteredDirectoryFiles.create("file:///C:/Users/USUARIO/Desktop/MyToolsTypeScript/dist/pruebas/LoadModules.js");
    console.log(await directoryFilter.getFileNames(".js"));
}