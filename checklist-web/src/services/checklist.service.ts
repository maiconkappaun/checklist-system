import request from "./api";

import type {
    Checklist,
    ChecklistStatus,
    CreateChecklistData,
} from "../types/checklist";

export async function getChecklists(): Promise<
    Checklist[]
> {
    return request<Checklist[]>("/checklists");
}

export async function getAvailableChecklists(): Promise<
    Checklist[]
> {
    return request<Checklist[]>(
        "/checklists/disponiveis",
    );
}

export async function getChecklistById(
    id: string,
): Promise<Checklist> {
    return request<Checklist>(
        `/checklists/${id}`,
    );
}

export async function createChecklist(
    data: CreateChecklistData,
): Promise<Checklist> {
    return request<Checklist>("/checklists", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export async function updateChecklistStatus(
    id: string,
    status: ChecklistStatus,
): Promise<Checklist> {
    return request<Checklist>(
        `/checklists/${id}/status`,
        {
            method: "PATCH",
            body: JSON.stringify({
                status,
            }),
        },
    );
}

export async function getDraftChecklists(): Promise<
    Checklist[]
> {
    return request<Checklist[]>(
        "/checklists/rascunhos",
    );
}

