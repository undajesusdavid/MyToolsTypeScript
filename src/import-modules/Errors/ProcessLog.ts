//import type { ImportResult } from "../Types.js";

import type { ImportedModule } from "../Types.js";

export function processLogImportModules(results: PromiseSettledResult<ImportedModule>[]): void {
    if (results.length > 0) {
        console.log("Si hay results");
        results.forEach((result, index) => {
            if (result.status === "rejected") {
                console.log(`Error-${index}: ${result.reason}`);
            }
        })
    }else {
        console.log("No hay results");
    }

}
