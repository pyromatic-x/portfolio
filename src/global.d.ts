export {};

declare global {
  interface Window {
    ym?: (id: number, method: string, options: Record<string, unknown>) => void;
  }
}
