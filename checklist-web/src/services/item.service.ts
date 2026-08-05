import request from "./api";
import type { Item } from "../types/item";

export async function getItems(): Promise<Item[]> {
    return request<Item[]>("/itens");
}

export async function createItem(
    descricao: string,
): Promise<Item> {
    return request<Item>("/itens", {
        method: "POST",
        body: JSON.stringify({
            descricao,
        }),
    });
}