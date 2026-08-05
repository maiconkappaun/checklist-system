<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute, RouterLink } from "vue-router";

import { useChecklistStore } from "../stores/checklist.store";

const route = useRoute();
const checklistStore = useChecklistStore();

onMounted(() => {
    const id = route.params.id;

    if (typeof id === "string") {
        checklistStore.carregarChecklist(id);
    }
});
</script>

<template>
    <div class="mx-auto min-h-[calc(100vh-73px)] max-w-4xl px-6 py-10">
        <!-- Voltar -->
        <RouterLink to="/checklists"
            class="mb-6 inline-flex items-center text-sm font-medium text-blue-950 hover:text-cyan-500">
            ← Voltar para checklists
        </RouterLink>

        <!-- Carregando -->
        <div v-if="
            checklistStore.loading &&
            !checklistStore.checklistSelecionado
        " class="rounded-xl bg-white p-10 text-center text-slate-500 shadow-sm">
            Carregando checklist...
        </div>

        <!-- Erro -->
        <div v-else-if="checklistStore.error" class="rounded-xl bg-red-50 p-6 text-center text-sm text-red-600">
            {{ checklistStore.error }}
        </div>

        <!-- Checklist -->
        <article v-else-if="
            checklistStore.checklistSelecionado
        " class="rounded-xl bg-white p-8 shadow-sm">
            <!-- Cabeçalho -->
            <div class="mb-8 border-b border-slate-200 pb-6">
                <div class="mb-4 flex flex-wrap items-start justify-between gap-4">
                    <h1 class="text-3xl font-bold text-slate-800">
                        {{
                            checklistStore.checklistSelecionado
                                .nome
                        }}
                    </h1>

                    <span class="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                        {{
                            checklistStore.checklistSelecionado
                                .status === "PRONTO"
                                ? "Pronto"
                                : "Rascunho"
                        }}
                    </span>
                </div>

                <p v-if="
                    checklistStore.checklistSelecionado
                        .descricao
                " class="leading-7 text-slate-500">
                    {{
                        checklistStore.checklistSelecionado
                            .descricao
                    }}
                </p>
            </div>

            <!-- Itens -->
            <div>
                <h2 class="mb-4 text-xl font-semibold text-slate-800">
                    Itens de verificação
                </h2>

                <div v-if="
                    !checklistStore.checklistSelecionado
                        .checklistItems.length
                " class="rounded-lg border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
                    Nenhum item vinculado a este checklist.
                </div>

                <ul v-else class="space-y-3">
                    <li v-for="(
checklistItem, index
            ) in checklistStore.checklistSelecionado
        .checklistItems" :key="`${checklistItem.checklistId}-${checklistItem.itemId}`
            " class="flex items-center gap-4 rounded-lg border border-slate-200 p-4">
                        <span
                            class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-medium text-blue-600">
                            {{ index + 1 }}
                        </span>

                        <span class="text-slate-700">
                            {{ checklistItem.item.descricao }}
                        </span>
                    </li>
                </ul>
            </div>
        </article>
    </div>
</template>