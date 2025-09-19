export class UnknownError extends Error {
    message: string;
    code: string = "ERR_UNKNOWN";

    constructor(error: any, customMessage?: string) {
        let message = "Error desconocido";
        if (customMessage) {
            message = message + " : " + customMessage + " ERROR: " + error;
        } else {
            message = message + " ERROR: " + error;
        }
        super(message);
        this.message = message;
    }
}

export class ErrorInvalidURL extends Error {
    message: string;
    code: string = "ERR_INVALID_URL";

    constructor(fileURL: string, customMessage?: string) {
        let message = `La ruta ${fileURL} es invalida`;
        if (customMessage) message = message + " : " + customMessage;
        super(message);
        this.message = message;
    }
}

export class DirectoryDoesNotExist extends Error {
    message: string;
    code: string = "ENOENT";

    constructor(directory: string, customMessage?: string) {
        let message = `No existe el directorio ${directory}`;
        if (customMessage) message = message + " : " + customMessage;
        super(message);
        this.message = message;
    }
}

export class DirectoryPointsToFile extends Error {
    message: string;
    code: string = "ENOTDIR";

    constructor(directory: string, customMessage?: string) {
        let message = `El directorio ${directory} apunta a un archivo y no a una carpeta`;
        if (customMessage) message = message + " : " + customMessage;
        super(message);
        this.message = message;
    }
}



export class WithoutDirectoryPermissions extends Error {
    message: string;
    code: string = "EACCES";

    constructor(directory: string, customMessage?: string) {
        let message = `No tiene permisos para leer el directorio ${directory}`;
        if (customMessage) message = message + " : " + customMessage;
        super(message);
        this.message = message;
    }
}

export class InvalidExtension extends Error {
    message: string;
    code: string = "INVALID_EXTENSION";

    constructor(extension: string, customMessage?: string) {
        let message = `La extension \"${extension}\" no es un string valido`;
        if (customMessage) message = message + " : " + customMessage;
        super(message);
        this.message = message;
    }
}
