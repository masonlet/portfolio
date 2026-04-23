export const asset = (path: string): string => new URL(path, import.meta.url).href;
