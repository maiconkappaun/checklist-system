import { defineStore } from "pinia";
import { ref } from "vue";

import type { Item } from "../types/item";
import * as itemService from "../services/item.service";

export const useItemStore = defineStore("item", () => {
    const items = ref<Item[]>([]);
    const loading = ref(false);
    const error = ref("");

    async function carregarItens() {
        try {
            loading.value = true;
            error.value = "";

            items.value = await itemService.getItems();
        } catch (err) {
            error.value =
                err instanceof Error
                    ? err.message
                    : "Erro ao carregar itens.";
        } finally {
            loading.value = false;
        }
    }

    async function cadastrarItem(descricao: string) {
        try {
            loading.value = true;
            error.value = "";

            const item = await itemService.createItem(descricao);

            items.value.push(item);

            return item;
        } catch (err) {
            error.value =
                err instanceof Error
                    ? err.message
                    : "Erro ao cadastrar item.";

            throw err;
        } finally {
            loading.value = false;
        }
    }

    return {
        items,
        loading,
        error,
        carregarItens,
        cadastrarItem,
    };
});