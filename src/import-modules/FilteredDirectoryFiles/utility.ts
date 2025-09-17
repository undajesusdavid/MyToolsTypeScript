
export function isConstructible(fn: any): fn is new (...args: any[]) => any {
    try {
        new fn(...[]);
        return true;
    } catch {
        return false;
    }
}

export function instantiate<T>(fn: Function, args: any[]): T {
    return isConstructible(fn) ? new fn(...args) : fn(...args);
}