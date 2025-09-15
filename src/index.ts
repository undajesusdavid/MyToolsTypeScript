import { ImportModules } from "./import-modules/ImportModules.js";


(async () => {

   const importModules = ImportModules.create(import.meta.url);
   console.log(importModules.getAllFiles());
   
})();