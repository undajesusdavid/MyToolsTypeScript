export function isConstructible(fn: any): fn is new (...args: any[]) => any {
    try {
        new fn(...[]);
        return true;
    } catch {
        return false;
    }
}