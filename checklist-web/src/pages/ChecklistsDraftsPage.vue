<script setup lang="ts">
import { onMounted } from "vue";
import { RouterLink } from "vue-router";

import { useChecklistStore } from "../stores/checklist.store";
import ChecklistDraftList from "../components/checklists/ChecklistDraftList.vue";

const checklistStore = useChecklistStore();

onMounted(() => {
    checklistStore.carregarRascunhos();
});
</script>

<template>
    <div class="mx-auto min-h-[calc(100vh-73px)] max-w-6xl px-6 py-10">
        <!-- Cabeçalho -->
        <div class="mb-8">
            <RouterLink to="/checklists" class="mb-4 inline-flex text-sm font-medium text-blue-950 hover:text-cyan-500">
                ← Voltar para checklists
            </RouterLink>

            <h1 class="text-3xl font-bold text-slate-800">
                Rascunhos
            </h1>

            <p class="mt-2 text-slate-500">
                Gerencie os checklists que ainda não estão
                disponíveis.
            </p>
        </div>

        <ChecklistDraftList />
    </div>
</template>