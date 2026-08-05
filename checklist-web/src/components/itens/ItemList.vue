<script setup lang="ts">
import { onMounted } from "vue";
import { useItemStore } from "../../stores/item.store";

const itemStore = useItemStore();

onMounted(() => {
    itemStore.carregarItens();
});
</script>

<template>
    <section class="rounded-xl bg-white p-6 shadow-sm">
        <div class="mb-5">
            <h2 class="text-xl font-semibold text-slate-800">
                Itens cadastrados
            </h2>

            <p class="mt-1 text-sm text-slate-500">
                Itens disponíveis para utilização nos
                checklists.
            </p>
        </div>

        <div v-if="itemStore.loading && !itemStore.items.length" class="py-8 text-center text-slate-500">
            Carregando itens...
        </div>

        <div v-else-if="!itemStore.items.length"
            class="rounded-lg border border-dashed border-slate-300 py-10 text-center text-slate-500">
            Nenhum item cadastrado.
        </div>

        <ul v-else class="divide-y divide-slate-100">
            <li v-for="(item, index) in itemStore.items" :key="item.id" class="flex items-center gap-4 py-4">
                <span
                    class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-medium text-blue-600">
                    {{ index + 1 }}
                </span>

                <span class="text-slate-700">
                    {{ item.descricao }}
                </span>
            </li>
        </ul>
    </section>
</template>