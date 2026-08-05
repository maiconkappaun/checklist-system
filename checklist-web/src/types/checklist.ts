import type { Item } from "./item";

export type ChecklistStatus =
    | "RASCUNHO"
    | "PRONTO";

export interface ChecklistItem {
    checklistId: string;
    itemId: string;
    item: Item;
}

export interface Checklist {
    id: string;
    nome: string;
    descricao: string | null;
    status: ChecklistStatus;
    checklistItems: ChecklistItem[];
}

export interface CreateChecklistData {
    nome: string;
    descricao?: string;
    status: ChecklistStatus;
    itemIds: string[];
}