import { createStore } from "@tanstack/store";

export const previewTableDataStore = createStore<Record<string, unknown>[]>([]);
