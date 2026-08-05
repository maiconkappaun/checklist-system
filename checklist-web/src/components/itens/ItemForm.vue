<script setup lang="ts">
import { ref } from "vue";
import { useItemStore } from "../../stores/item.store";

const itemStore = useItemStore();

const descricao = ref("");
const success = ref("");

async function handleSubmit() {
    if (!descricao.value.trim()) {
        return;
    }

    try {
        await itemStore.cadastrarItem(
            descricao.value.trim(),
        );

        descricao.value = "";
        success.value = "Item cadastrado com sucesso.";

        setTimeout(() => {
            success.value = "";
        }, 3000);
    } catch {
        // O erro já é tratado pelo store.
    }
}
</script>

<template>
    <section class="rounded-xl bg-white p-6 shadow-sm">
        <h2 class="mb-4 text-xl font-semibold text-slate-800">
            Novo item
        </h2>

        <form class="flex flex-col gap-3 sm:flex-row" @submit.prevent="handleSubmit">
            <input v-model="descricao" type="text" placeholder="Ex.: O piso está limpo?"
                class="flex-1 rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />

            <button type="submit" :disabled="itemStore.loading"
                class="rounded-lg bg-blue-950 px-6 py-3 font-medium text-white transition hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-50">
                {{ itemStore.loading ? "Cadastrando..." : "Cadastrar" }}
            </button>
        </form>

        <p v-if="itemStore.error" class="mt-3 text-sm text-red-600">
            {{ itemStore.error }}
        </p>

        <p v-if="success" class="mt-3 text-sm text-green-600">
            {{ success }}
        </p>
    </section>
</template>