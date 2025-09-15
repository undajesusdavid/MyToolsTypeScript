export class ErrorInvalidURL extends Error {
    message: string;
    code: string = "ERR_INVALID_URL";

    constructor(message?: string) {
        const defaultMessage = "La url proporsionada no es valida, use import.meta.url";
        super(message || defaultMessage);
        this.message = message || defaultMessage;
    }
}

export class UnknownError extends Error {
    message: string;
    code: string = "ERR_UNKNOWN";
    constructor(message?: string) {
        const defaultMessage = "Error desconocido";
        super(message || defaultMessage);
        this.message = message || defaultMessage;
    }
}