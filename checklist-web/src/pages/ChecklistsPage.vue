<script setup lang="ts">
import { ref } from "vue";

import ChecklistList from "../components/checklists/ChecklistList.vue";
import ChecklistFormModal from "../components/checklists/ChecklistFormModal.vue";
import ChecklistDraftList from "../components/checklists/ChecklistDraftList.vue";

const showCreateModal = ref(false);
</script>

<template>
    <div class="mx-auto min-h-[calc(100vh-73px)] max-w-6xl px-6 py-10">
        <!-- Cabeçalho -->
        <div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h1 class="text-3xl font-bold text-slate-800">
                    Checklists
                </h1>

                <p class="mt-2 text-slate-500">
                    Consulte os checklists disponíveis.
                </p>
            </div>

            <div class="flex flex-wrap gap-3">
                <RouterLink to="/checklists/rascunhos"
                    class="rounded-lg border border-slate-300 px-5 py-3 font-medium text-slate-700 transition hover:bg-slate-50">
                    Rascunhos
                </RouterLink>

                <button type="button"
                    class="rounded-lg bg-blue-950  px-5 py-3 font-medium text-white transition hover:bg-cyan-500"
                    @click="showCreateModal = true">
                    + Novo checklist
                </button>
            </div>
        </div>

        <!-- Checklists disponíveis -->
        <section>
            <div class="mb-5">
                <h2 class="text-xl font-semibold text-slate-800">
                    Checklists disponíveis
                </h2>

                <p class="mt-1 text-sm text-slate-500">
                    Apenas checklists com status Pronto são
                    exibidos.
                </p>
            </div>

            <ChecklistList />
        </section>

        <!-- Modal de criação -->
        <ChecklistFormModal :open="showCreateModal" @close="showCreateModal = false" />
    </div>
</template>