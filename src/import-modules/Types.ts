export type ImportedModule = Record<string, unknown>;
export type ImportResult = {
  file: string;
  status: "fulfilled" | "rejected";
  value?: ImportedModule;
  reason?: unknown;
};