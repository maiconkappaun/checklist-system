<script setup lang="ts">
import { onMounted, ref } from "vue";

import { useChecklistStore } from "../../stores/checklist.store";
import type { Checklist } from "../../types/checklist";

import ChecklistCard from "./ChecklistCard.vue";
import ChecklistStatusModal from "./ChecklistStatusModal.vue";

const checklistStore = useChecklistStore();

const showStatusModal = ref(false);

const checklistSelecionado =
    ref<Checklist | null>(null);

onMounted(() => {
    checklistStore.carregarDisponiveis();
});

function abrirStatusModal(checklist: Checklist) {
    checklistSelecionado.value = checklist;
    showStatusModal.value = true;
}

function fecharStatusModal() {
    showStatusModal.value = false;
    checklistSelecionado.value = null;
}

async function salvarStatus(
    status: "RASCUNHO" | "PRONTO",
) {
    if (!checklistSelecionado.value) {
        return;
    }

    try {
        await checklistStore.alterarStatus(
            checklistSelecionado.value.id,
            status,
        );

        fecharStatusModal();
    } catch {
        // Erro disponível no store.
    }
}
</script>

<template>
    <section>
        <div v-if="
            checklistStore.loading &&
            !checklistStore.checklistsDisponiveis.length
        " class="rounded-xl bg-white p-10 text-center text-slate-500 shadow-sm">
            Carregando checklists...
        </div>

        <div v-else-if="
            checklistStore.error
        " class="rounded-xl bg-red-50 p-6 text-center text-sm text-red-600">
            {{ checklistStore.error }}
        </div>

        <div v-else-if="
            !checklistStore.checklistsDisponiveis.length
        " class="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
            <h2 class="text-lg font-semibold text-slate-700">
                Nenhum checklist disponível
            </h2>

            <p class="mt-2 text-sm text-slate-500">
                Ainda não existem checklists com status
                Pronto.
            </p>
        </div>

        <div v-else class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <ChecklistCard v-for="checklist in checklistStore.checklistsDisponiveis" :key="checklist.id"
                :checklist="checklist" @change-status="abrirStatusModal(checklist)" />
        </div>

        <ChecklistStatusModal :open="showStatusModal" :checklist="checklistSelecionado" @close="fecharStatusModal"
            @save="salvarStatus" />
    </section>
</template>