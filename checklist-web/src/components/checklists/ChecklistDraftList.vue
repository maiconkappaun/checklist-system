<script setup lang="ts">
import { onMounted, ref } from "vue";

import { useChecklistStore } from "../../stores/checklist.store";
import type { Checklist } from "../../types/checklist";

import ChecklistDraftCard from "./ChecklistDraftCard.vue";
import ChecklistStatusModal from "./ChecklistStatusModal.vue";

const checklistStore = useChecklistStore();

const showStatusModal = ref(false);

const checklistSelecionado =
    ref<Checklist | null>(null);

onMounted(() => {
    checklistStore.carregarRascunhos();
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

        await checklistStore.carregarRascunhos();
    } catch {
        
    }
}
</script>

<template>
    <section>
        <!-- Carregando -->
        <div v-if="
            checklistStore.loading &&
            !checklistStore.checklistsRascunho.length
        " class="rounded-xl bg-white p-8 text-center text-sm text-slate-500 shadow-sm">
            Carregando rascunhos...
        </div>

        <!-- Erro -->
        <div v-else-if="checklistStore.error" class="rounded-xl bg-red-50 p-6 text-center text-sm text-red-600">
            {{ checklistStore.error }}
        </div>

        <!-- Nenhum rascunho -->
        <div v-else-if="
            !checklistStore.checklistsRascunho.length
        " class="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">
            <p class="text-sm text-slate-500">
                Nenhum checklist em rascunho.
            </p>
        </div>

        <!-- Lista -->
        <div v-else class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <ChecklistDraftCard v-for="checklist in checklistStore.checklistsRascunho" :key="checklist.id"
                :checklist="checklist" @change-status="abrirStatusModal(checklist)" />
        </div>

        <!-- Modal -->
        <ChecklistStatusModal :open="showStatusModal" :checklist="checklistSelecionado" @close="fecharStatusModal"
            @save="salvarStatus" />
    </section>
</template>